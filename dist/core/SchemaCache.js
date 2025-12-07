"use strict";
/**
 * Schema Cache
 *
 * Provides caching mechanism for compiled schema validators.
 * Improves performance by avoiding repeated schema compilation.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCache = void 0;
exports.getSchemaCache = getSchemaCache;
exports.createSchemaCache = createSchemaCache;
const _2019_1 = __importDefault(require("ajv/dist/2019"));
class SchemaCache {
    constructor(ajvOptions) {
        this.cache = new Map();
        this.stats = {
            hits: 0,
            misses: 0,
            size: 0,
        };
        this.ajv = new _2019_1.default(ajvOptions || {
            allErrors: true,
            strict: false,
            validateFormats: false,
        });
    }
    /**
     * Get a validator from cache or compile if not exists
     */
    getValidator(schemaId, schema) {
        if (this.cache.has(schemaId)) {
            this.stats.hits++;
            return this.cache.get(schemaId);
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
    getOrCreateValidator(schema) {
        const schemaId = this.generateSchemaId(schema);
        return this.getValidator(schemaId, schema);
    }
    /**
     * Check if a validator exists in cache
     */
    has(schemaId) {
        return this.cache.has(schemaId);
    }
    /**
     * Invalidate a specific cache entry
     */
    invalidate(schemaId) {
        const existed = this.cache.delete(schemaId);
        if (existed) {
            this.stats.size = this.cache.size;
        }
        return existed;
    }
    /**
     * Invalidate all cache entries
     */
    invalidateAll() {
        this.cache.clear();
        this.stats.size = 0;
    }
    /**
     * Get cache statistics
     */
    getStats() {
        return { ...this.stats };
    }
    /**
     * Reset statistics
     */
    resetStats() {
        this.stats = {
            hits: 0,
            misses: 0,
            size: this.cache.size,
        };
    }
    /**
     * Get cache hit rate
     */
    getHitRate() {
        const total = this.stats.hits + this.stats.misses;
        return total === 0 ? 0 : this.stats.hits / total;
    }
    /**
     * Generate a unique ID for a schema
     */
    generateSchemaId(schema) {
        // Use JSON stringify for simple schema ID generation
        // For production, consider using a hash function for better performance
        return JSON.stringify(schema);
    }
    /**
     * Get the underlying AJV instance
     */
    getAjv() {
        return this.ajv;
    }
    /**
     * Add a schema to AJV instance
     */
    addSchema(schema, schemaId) {
        this.ajv.addSchema(schema, schemaId);
    }
    /**
     * Remove a schema from AJV instance
     */
    removeSchema(schemaIdOrRef) {
        this.ajv.removeSchema(schemaIdOrRef);
    }
}
exports.SchemaCache = SchemaCache;
// Singleton instance
let instance = null;
/**
 * Get the singleton instance of SchemaCache
 */
function getSchemaCache() {
    if (!instance) {
        instance = new SchemaCache();
    }
    return instance;
}
/**
 * Create a new SchemaCache instance (for testing or isolated usage)
 */
function createSchemaCache(ajvOptions) {
    return new SchemaCache(ajvOptions);
}
