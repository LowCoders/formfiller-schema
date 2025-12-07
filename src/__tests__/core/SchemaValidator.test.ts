/**
 * SchemaValidator Tests
 *
 * Tests for validation levels and custom rules
 */

import { SchemaValidator, ValidationLevel } from '../../core/SchemaValidator';

describe('SchemaValidator', () => {
  let validator: SchemaValidator;

  const testSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      type: { type: 'string', enum: ['grid', 'tree', 'form'] },
      items: { type: 'array' },
    },
    required: ['title', 'type'],
  };

  beforeEach(() => {
    validator = new SchemaValidator();
  });

  describe('Strict Validation', () => {
    it('should pass valid configuration', () => {
      const config = {
        title: 'Test Config',
        type: 'form',
        items: [],
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.STRICT,
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail missing required fields', () => {
      const config = {
        title: 'Test Config',
        // missing 'type'
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.STRICT,
      });

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should fail invalid enum value', () => {
      const config = {
        title: 'Test Config',
        type: 'invalid',
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.STRICT,
      });

      expect(result.valid).toBe(false);
    });
  });

  describe('Loose Validation', () => {
    it('should pass with missing optional fields', () => {
      const config = {
        title: 'Test Config',
        type: 'form',
        // items is optional in loose mode
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.LOOSE,
      });

      expect(result.valid).toBe(true);
    });

    it('should still catch critical type errors', () => {
      const config = {
        title: 123, // should be string
        type: 'form',
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.LOOSE,
      });

      expect(result.valid).toBe(false);
    });
  });

  describe('Development Validation', () => {
    it('should pass almost anything', () => {
      const config = {
        title: 'Test Config',
        // missing 'type' but still passes in dev mode
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.DEVELOPMENT,
      });

      expect(result.valid).toBe(true);
      expect(result.warnings).toBeDefined();
    });

    it('should fail if not an object', () => {
      const config = null;

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.DEVELOPMENT,
      });

      expect(result.valid).toBe(false);
    });

    it('should warn about missing recommended fields', () => {
      const config = {};

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.DEVELOPMENT,
      });

      expect(result.warnings).toBeDefined();
      expect(result.warnings!.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Rules', () => {
    it('should apply custom validation rules', () => {
      const config = {
        title: 'Short',
        type: 'form',
      };

      const result = validator.validate(config, testSchema, {
        level: ValidationLevel.STRICT,
        customRules: [
          {
            field: 'title',
            validator: (value) => value && value.length >= 10,
            message: 'Title must be at least 10 characters',
          },
        ],
      });

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.message.includes('10 characters'))).toBe(true);
    });
  });

  describe('Cache Management', () => {
    it('should cache compiled validators', () => {
      const config = { title: 'Test', type: 'form' };

      // First call
      validator.validate(config, testSchema);

      // Second call should use cached validator
      const result = validator.validate(config, testSchema);

      expect(result.valid).toBe(true);
    });

    it('should clear cache', () => {
      const config = { title: 'Test', type: 'form' };

      validator.validate(config, testSchema);
      validator.clearCache();

      // Should still work after cache clear
      const result = validator.validate(config, testSchema);
      expect(result.valid).toBe(true);
    });
  });
});
