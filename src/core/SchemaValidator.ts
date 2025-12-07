/**
 * Schema Validator
 *
 * Provides multi-level validation for schema configurations.
 * Supports STRICT, LOOSE, and DEVELOPMENT validation modes.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */

import Ajv2019, { ValidateFunction, ErrorObject } from 'ajv/dist/2019';

export enum ValidationLevel {
  STRICT = 'strict',
  LOOSE = 'loose',
  DEVELOPMENT = 'development',
}

export interface ValidationRule {
  field: string;
  validator: (value: any) => boolean;
  message: string;
}

export interface ValidationOptions {
  level: ValidationLevel;
  allowDeprecated?: boolean;
  customRules?: ValidationRule[];
  abortEarly?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export class SchemaValidator {
  private ajv: Ajv2019;
  private compiledValidators: Map<string, ValidateFunction> = new Map();

  constructor() {
    this.ajv = new Ajv2019({
      allErrors: true,
      strict: false,
      validateFormats: false,
    });
  }

  /**
   * Validate a configuration with specified options
   */
  validate(
    config: any,
    schema: any,
    options: ValidationOptions = { level: ValidationLevel.STRICT }
  ): ValidationResult {
    switch (options.level) {
      case ValidationLevel.STRICT:
        return this.strictValidation(config, schema, options);
      case ValidationLevel.LOOSE:
        return this.looseValidation(config, schema, options);
      case ValidationLevel.DEVELOPMENT:
        return this.devValidation(config, schema, options);
      default:
        return this.strictValidation(config, schema, options);
    }
  }

  /**
   * Strict validation - all fields required, full type checking
   */
  private strictValidation(config: any, schema: any, options: ValidationOptions): ValidationResult {
    const validator = this.getValidator(schema);
    const valid = validator(config) as boolean;

    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!valid && validator.errors) {
      for (const error of validator.errors) {
        errors.push(this.formatAjvError(error));
      }
    }

    // Apply custom rules
    if (options.customRules) {
      this.applyCustomRules(config, options.customRules, errors);
    }

    // Check for deprecated fields
    if (!options.allowDeprecated) {
      this.checkDeprecatedFields(config, warnings);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Loose validation - optional fields allowed, basic type checking
   */
  private looseValidation(config: any, schema: any, options: ValidationOptions): ValidationResult {
    // Create a modified schema with all required fields removed
    const looseSchema = this.makeSchemaLoose(schema);
    const validator = this.getValidator(looseSchema);
    const valid = validator(config) as boolean;

    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!valid && validator.errors) {
      // In loose mode, only report critical errors
      for (const error of validator.errors) {
        if (this.isCriticalError(error)) {
          errors.push(this.formatAjvError(error));
        } else {
          warnings.push({
            field: error.instancePath || 'root',
            message: error.message || 'Validation warning',
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Development validation - minimal checks, maximum flexibility
   */
  private devValidation(config: any, schema: any, options: ValidationOptions): ValidationResult {
    const warnings: ValidationWarning[] = [];

    // Basic structure check
    if (!config || typeof config !== 'object') {
      return {
        valid: false,
        errors: [
          {
            field: 'root',
            message: 'Configuration must be an object',
          },
        ],
      };
    }

    // Warn about missing recommended fields
    if (!config.title) {
      warnings.push({
        field: 'title',
        message: 'Title is recommended',
        suggestion: 'Add a descriptive title to your configuration',
      });
    }

    return {
      valid: true,
      errors: [],
      warnings,
    };
  }

  /**
   * Get or compile a validator for a schema
   */
  private getValidator(schema: any): ValidateFunction {
    const schemaId = JSON.stringify(schema);

    if (!this.compiledValidators.has(schemaId)) {
      const validator = this.ajv.compile(schema);
      this.compiledValidators.set(schemaId, validator);
    }

    return this.compiledValidators.get(schemaId)!;
  }

  /**
   * Make schema loose by removing required fields
   */
  private makeSchemaLoose(schema: any): any {
    const looseSchema = { ...schema };
    if (looseSchema.required) {
      // Keep only critical required fields
      looseSchema.required = looseSchema.required.filter((field: string) =>
        ['type', 'items'].includes(field)
      );
    }
    return looseSchema;
  }

  /**
   * Check if an AJV error is critical
   */
  private isCriticalError(error: ErrorObject): boolean {
    // Type errors and missing critical fields are critical
    return (
      error.keyword === 'type' ||
      error.keyword === 'enum' ||
      (error.keyword === 'required' && ['type', 'items'].includes(error.params.missingProperty))
    );
  }

  /**
   * Format AJV error to our format
   */
  private formatAjvError(error: ErrorObject): ValidationError {
    return {
      field: error.instancePath || error.params.missingProperty || 'root',
      message: error.message || 'Validation failed',
      value: error.data,
    };
  }

  /**
   * Apply custom validation rules
   */
  private applyCustomRules(config: any, rules: ValidationRule[], errors: ValidationError[]): void {
    for (const rule of rules) {
      const value = this.getNestedValue(config, rule.field);
      if (!rule.validator(value)) {
        errors.push({
          field: rule.field,
          message: rule.message,
          value,
        });
      }
    }
  }

  /**
   * Check for deprecated fields (stub for integration with DeprecationManager)
   */
  private checkDeprecatedFields(config: any, warnings: ValidationWarning[]): void {
    // This will be integrated with DeprecationManager
    // For now, check common deprecated fields
    if ('addSaveBtn' in config) {
      warnings.push({
        field: 'addSaveBtn',
        message: 'Field "addSaveBtn" is deprecated since v2.0.0',
        suggestion: 'Use preferences.addSaveBtn instead',
      });
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Clear compiled validator cache
   */
  clearCache(): void {
    this.compiledValidators.clear();
  }
}
