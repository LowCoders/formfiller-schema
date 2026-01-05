/**
 * Schema Validator
 *
 * Provides multi-level validation for schema configurations.
 * Supports STRICT, LOOSE, and DEVELOPMENT validation modes.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */
import Ajv2019pkg from 'ajv/dist/2019.js';
const Ajv2019 = Ajv2019pkg.default || Ajv2019pkg;
export var ValidationLevel;
(function (ValidationLevel) {
    ValidationLevel["STRICT"] = "strict";
    ValidationLevel["LOOSE"] = "loose";
    ValidationLevel["DEVELOPMENT"] = "development";
})(ValidationLevel || (ValidationLevel = {}));
export class SchemaValidator {
    ajv;
    compiledValidators = new Map();
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
    validate(config, schema, options = { level: ValidationLevel.STRICT }) {
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
    strictValidation(config, schema, options) {
        const validator = this.getValidator(schema);
        const valid = validator(config);
        const errors = [];
        const warnings = [];
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
    looseValidation(config, schema, options) {
        // Create a modified schema with all required fields removed
        const looseSchema = this.makeSchemaLoose(schema);
        const validator = this.getValidator(looseSchema);
        const valid = validator(config);
        const errors = [];
        const warnings = [];
        if (!valid && validator.errors) {
            // In loose mode, only report critical errors
            for (const error of validator.errors) {
                if (this.isCriticalError(error)) {
                    errors.push(this.formatAjvError(error));
                }
                else {
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
    devValidation(config, schema, options) {
        const warnings = [];
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
    getValidator(schema) {
        const schemaId = JSON.stringify(schema);
        if (!this.compiledValidators.has(schemaId)) {
            const validator = this.ajv.compile(schema);
            this.compiledValidators.set(schemaId, validator);
        }
        return this.compiledValidators.get(schemaId);
    }
    /**
     * Make schema loose by removing required fields
     */
    makeSchemaLoose(schema) {
        const looseSchema = { ...schema };
        if (looseSchema.required) {
            // Keep only critical required fields
            looseSchema.required = looseSchema.required.filter((field) => ['type', 'items'].includes(field));
        }
        return looseSchema;
    }
    /**
     * Check if an AJV error is critical
     */
    isCriticalError(error) {
        // Type errors and missing critical fields are critical
        return (error.keyword === 'type' ||
            error.keyword === 'enum' ||
            (error.keyword === 'required' && ['type', 'items'].includes(error.params.missingProperty)));
    }
    /**
     * Format AJV error to our format
     */
    formatAjvError(error) {
        return {
            field: error.instancePath || error.params.missingProperty || 'root',
            message: error.message || 'Validation failed',
            value: error.data,
        };
    }
    /**
     * Apply custom validation rules
     */
    applyCustomRules(config, rules, errors) {
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
    checkDeprecatedFields(config, warnings) {
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
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    /**
     * Clear compiled validator cache
     */
    clearCache() {
        this.compiledValidators.clear();
    }
}
