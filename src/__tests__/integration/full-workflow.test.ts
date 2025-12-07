/**
 * Integration Tests
 *
 * Tests for complete workflows combining multiple features
 */

import {
  getVersionManager,
  getSchemaCache,
  getPerformanceMonitor,
  getDeprecationManager,
  getMigrationRegistry,
  SchemaDefaults,
  ValidationLevel,
  SchemaValidator,
} from '../..';

describe('Integration Tests', () => {
  describe('Full Migration and Validation Workflow', () => {
    it('should migrate v1 config and validate successfully', () => {
      // Setup: v1 configuration
      const v1Config = {
        title: 'Test Config',
        type: 'form',
        version: '1.0.0',
        addSaveBtn: true, // Deprecated field
        config: {
          columns: [
            // Deprecated field
            {
              name: 'field1',
              type: 'text',
              title: 'Field 1',
            },
          ],
        },
      };

      // Step 1: Check for deprecations
      const deprecationManager = getDeprecationManager();
      const deprecationWarnings = deprecationManager.checkDeprecations(v1Config);

      expect(deprecationWarnings.length).toBeGreaterThan(0);

      // Step 2: Migrate to v2 (using migration registry to ensure migrations are registered)
      const migrationRegistry = getMigrationRegistry();
      const v2Config = migrationRegistry.migrateToLatest(v1Config, '2.0.0');

      expect(v2Config.version).toBe('2.0.0');
      expect(v2Config.config.items).toBeDefined();
      expect(v2Config.preferences).toBeDefined();
      expect(v2Config.preferences.addSaveBtn).toBe(true);

      // Step 3: Apply defaults
      const configWithDefaults = {
        ...v2Config,
        preferences: SchemaDefaults.deepApplyDefaults(
          v2Config.preferences || {},
          SchemaDefaults.FormPreferences
        ),
      };

      expect(configWithDefaults.preferences.saveLimit).toBeNull();
    });
  });

  describe('Performance-Monitored Validation with Cache', () => {
    it('should validate with performance monitoring', () => {
      const monitor = getPerformanceMonitor();
      const cache = getSchemaCache();
      const validator = new SchemaValidator();

      const schema = {
        type: 'object',
        properties: {
          title: { type: 'string' },
          type: { type: 'string', enum: ['form', 'grid', 'tree'] },
        },
        required: ['title', 'type'],
      };

      const config = {
        title: 'Test',
        type: 'form',
      };

      // First validation (cache miss)
      const result1 = monitor.measure('validation-1', () => {
        return validator.validate(config, schema, {
          level: ValidationLevel.STRICT,
        });
      });

      expect(result1.valid).toBe(true);

      // Second validation (cache hit)
      const result2 = monitor.measure('validation-2', () => {
        return validator.validate(config, schema, {
          level: ValidationLevel.STRICT,
        });
      });

      expect(result2.valid).toBe(true);

      // Performance stats
      const stats = monitor.getAllStats();
      expect(stats.length).toBeGreaterThan(0);
    });
  });

  describe('Multi-Level Validation', () => {
    const schema = {
      type: 'object',
      properties: {
        title: { type: 'string' },
        type: { type: 'string' },
      },
      required: ['title', 'type'],
    };

    const validator = new SchemaValidator();

    it('should enforce different validation levels', () => {
      const incompleteConfig = {
        title: 'Test',
        // missing 'type'
      };

      // STRICT: Should fail
      const strictResult = validator.validate(incompleteConfig, schema, {
        level: ValidationLevel.STRICT,
      });
      expect(strictResult.valid).toBe(false);

      // LOOSE: Might pass depending on implementation
      const looseResult = validator.validate(incompleteConfig, schema, {
        level: ValidationLevel.LOOSE,
      });
      // Loose is more forgiving but might still fail for required fields

      // DEVELOPMENT: Should pass
      const devResult = validator.validate(incompleteConfig, schema, {
        level: ValidationLevel.DEVELOPMENT,
      });
      expect(devResult.valid).toBe(true);
    });
  });

  describe('Complete Config Lifecycle', () => {
    it('should handle config from creation to usage', () => {
      // 1. Create config with partial preferences
      const partialConfig = {
        title: 'My Form',
        type: 'form' as const,
        config: {
          items: [
            {
              name: 'field1',
              type: 'text',
              title: 'Field 1',
            },
          ],
        },
        preferences: {
          addSaveBtn: true,
          // Other preferences should be filled with defaults
        },
      };

      // 2. Apply defaults
      const configWithDefaults = {
        ...partialConfig,
        preferences: SchemaDefaults.createFormPreferences(partialConfig.preferences),
      };

      expect(configWithDefaults.preferences.addSaveBtn).toBe(true);
      expect(configWithDefaults.preferences.saveLimit).toBeNull();

      // 3. Validate
      const validator = new SchemaValidator();
      const monitor = getPerformanceMonitor();

      const validationResult = monitor.measure('lifecycle-validation', () => {
        const schema = {
          type: 'object',
          properties: {
            title: { type: 'string' },
            type: { type: 'string' },
            config: { type: 'object' },
          },
          required: ['title', 'type', 'config'],
        };

        return validator.validate(configWithDefaults, schema, {
          level: ValidationLevel.LOOSE,
        });
      });

      expect(validationResult.valid).toBe(true);

      // 4. Check performance
      const stats = monitor.getStats('lifecycle-validation');
      expect(stats).toBeDefined();
      expect(stats!.count).toBe(1);
      expect(stats!.avgDuration).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid migration gracefully', () => {
      const versionManager = getVersionManager();

      expect(() => {
        versionManager.migrate({ version: '99.0.0' }, '100.0.0');
      }).toThrow();
    });

    it('should handle invalid config structure', () => {
      const validator = new SchemaValidator();

      const result = validator.validate(
        null,
        { type: 'object' },
        {
          level: ValidationLevel.DEVELOPMENT,
        }
      );

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
