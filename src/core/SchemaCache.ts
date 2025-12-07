/**
 * Schema Cache
 *
 * Provides caching mechanism for compiled schema validators.
 * Improves performance by avoiding repeated schema compilation.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */

import Ajv2019, { ValidateFunction } from 'ajv/dist/2019';

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
}

export class SchemaCache {
  private cache: Map<string, ValidateFunction> = new Map();
  private ajv: Ajv2019;
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    size: 0,
  };

  constructor(ajvOptions?: any) {
    this.ajv = new Ajv2019(
      ajvOptions || {
        allErrors: true,
        strict: false,
        validateFormats: false,
      }
    );
  }

  /**
   * Get a validator from cache or compile if not exists
   */
  getValidator(schemaId: string, schema: any): ValidateFunction {
    if (this.cache.has(schemaId)) {
      this.stats.hits++;
      return this.cache.get(schemaId)!;
    }

    // Cache miss - compile and store
    this.stats.misses++;
    const validator = this.ajv.compile(schema);
    this.cache.set(schemaId, validator);
    this.stats.size = this.cache.size;

    return validator;
  }

  /**
   * Get or create a validator with automatic schema ID generation
   */
  getOrCreateValidator(schema: any): ValidateFunction {
    const schemaId = this.generateSchemaId(schema);
    return this.getValidator(schemaId, schema);
  }

  /**
   * Check if a validator exists in cache
   */
  has(schemaId: string): boolean {
    return this.cache.has(schemaId);
  }

  /**
   * Invalidate a specific cache entry
   */
  invalidate(schemaId: string): boolean {
    const existed = this.cache.delete(schemaId);
    if (existed) {
      this.stats.size = this.cache.size;
    }
    return existed;
  }

  /**
   * Invalidate all cache entries
   */
  invalidateAll(): void {
    this.cache.clear();
    this.stats.size = 0;
  }

  /**
   * Get cache statistics
   */
  getStats(): Readonly<CacheStats> {
    return { ...this.stats };
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      size: this.cache.size,
    };
  }

  /**
   * Get cache hit rate
   */
  getHitRate(): number {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : this.stats.hits / total;
  }

  /**
   * Generate a unique ID for a schema
   */
  private generateSchemaId(schema: any): string {
    // Use JSON stringify for simple schema ID generation
    // For production, consider using a hash function for better performance
    return JSON.stringify(schema);
  }

  /**
   * Get the underlying AJV instance
   */
  getAjv(): Ajv2019 {
    return this.ajv;
  }

  /**
   * Add a schema to AJV instance
   */
  addSchema(schema: any, schemaId?: string): void {
    this.ajv.addSchema(schema, schemaId);
  }

  /**
   * Remove a schema from AJV instance
   */
  removeSchema(schemaIdOrRef: string): void {
    this.ajv.removeSchema(schemaIdOrRef);
  }
}

// Singleton instance
let instance: SchemaCache | null = null;

/**
 * Get the singleton instance of SchemaCache
 */
export function getSchemaCache(): SchemaCache {
  if (!instance) {
    instance = new SchemaCache();
  }
  return instance;
}

/**
 * Create a new SchemaCache instance (for testing or isolated usage)
 */
export function createSchemaCache(ajvOptions?: any): SchemaCache {
  return new SchemaCache(ajvOptions);
}
