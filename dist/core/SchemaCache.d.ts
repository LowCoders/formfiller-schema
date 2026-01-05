/**
 * Schema Cache
 *
 * Provides caching mechanism for compiled schema validators.
 * Improves performance by avoiding repeated schema compilation.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */
import { ValidateFunction } from 'ajv/dist/2019.js';
declare const Ajv2019: any;
type Ajv2019Type = InstanceType<typeof Ajv2019>;
export interface CacheStats {
    hits: number;
    misses: number;
    size: number;
}
export declare class SchemaCache {
    private cache;
    private ajv;
    private stats;
    constructor(ajvOptions?: any);
    /**
     * Get a validator from cache or compile if not exists
     */
    getValidator(schemaId: string, schema: any): ValidateFunction;
    /**
     * Get or create a validator with automatic schema ID generation
     */
    getOrCreateValidator(schema: any): ValidateFunction;
    /**
     * Check if a validator exists in cache
     */
    has(schemaId: string): boolean;
    /**
     * Invalidate a specific cache entry
     */
    invalidate(schemaId: string): boolean;
    /**
     * Invalidate all cache entries
     */
    invalidateAll(): void;
    /**
     * Get cache statistics
     */
    getStats(): Readonly<CacheStats>;
    /**
     * Reset statistics
     */
    resetStats(): void;
    /**
     * Get cache hit rate
     */
    getHitRate(): number;
    /**
     * Generate a unique ID for a schema
     */
    private generateSchemaId;
    /**
     * Get the underlying AJV instance
     */
    getAjv(): Ajv2019Type;
    /**
     * Add a schema to AJV instance
     */
    addSchema(schema: any, schemaId?: string): void;
    /**
     * Remove a schema from AJV instance
     */
    removeSchema(schemaIdOrRef: string): void;
}
/**
 * Get the singleton instance of SchemaCache
 */
export declare function getSchemaCache(): SchemaCache;
/**
 * Create a new SchemaCache instance (for testing or isolated usage)
 */
export declare function createSchemaCache(ajvOptions?: any): SchemaCache;
export {};
//# sourceMappingURL=SchemaCache.d.ts.map