/**
 * SchemaCache Tests
 *
 * Tests for schema caching functionality
 */

import { SchemaCache, createSchemaCache } from '../../core/SchemaCache';

describe('SchemaCache', () => {
  let cache: SchemaCache;

  const testSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
  };

  beforeEach(() => {
    cache = createSchemaCache();
  });

  describe('Validator Caching', () => {
    it('should cache validator on first access', () => {
      const validator = cache.getValidator('test-schema', testSchema);

      expect(validator).toBeDefined();
      expect(typeof validator).toBe('function');
    });

    it('should return cached validator on second access', () => {
      const validator1 = cache.getValidator('test-schema', testSchema);
      const validator2 = cache.getValidator('test-schema', testSchema);

      expect(validator1).toBe(validator2);
    });

    it('should track cache hits and misses', () => {
      cache.getValidator('test-schema', testSchema); // Miss
      cache.getValidator('test-schema', testSchema); // Hit

      const stats = cache.getStats();

      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
      expect(stats.size).toBe(1);
    });
  });

  describe('Cache Invalidation', () => {
    it('should invalidate specific cache entry', () => {
      cache.getValidator('test-schema', testSchema);

      const removed = cache.invalidate('test-schema');

      expect(removed).toBe(true);
      expect(cache.has('test-schema')).toBe(false);
    });

    it('should invalidate all cache entries', () => {
      cache.getValidator('schema1', testSchema);
      cache.getValidator('schema2', testSchema);

      cache.invalidateAll();

      expect(cache.getStats().size).toBe(0);
    });

    it('should return false for non-existent entry', () => {
      const removed = cache.invalidate('non-existent');
      expect(removed).toBe(false);
    });
  });

  describe('Cache Statistics', () => {
    it('should calculate hit rate correctly', () => {
      cache.getValidator('test', testSchema); // Miss
      cache.getValidator('test', testSchema); // Hit
      cache.getValidator('test', testSchema); // Hit

      const hitRate = cache.getHitRate();

      expect(hitRate).toBeCloseTo(2 / 3, 2);
    });

    it('should return 0 hit rate with no operations', () => {
      expect(cache.getHitRate()).toBe(0);
    });

    it('should reset statistics', () => {
      cache.getValidator('test', testSchema);
      cache.getValidator('test', testSchema);

      cache.resetStats();

      const stats = cache.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
    });
  });

  describe('Automatic Schema ID', () => {
    it('should generate schema ID automatically', () => {
      const validator = cache.getOrCreateValidator(testSchema);

      expect(validator).toBeDefined();
      expect(cache.getStats().size).toBe(1);
    });

    it('should use same ID for identical schemas', () => {
      cache.getOrCreateValidator(testSchema);
      cache.getOrCreateValidator(testSchema);

      const stats = cache.getStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
    });
  });
});
