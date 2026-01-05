/**
 * Schema Validator
 *
 * Provides multi-level validation for schema configurations.
 * Supports STRICT, LOOSE, and DEVELOPMENT validation modes.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */
export declare enum ValidationLevel {
    STRICT = "strict",
    LOOSE = "loose",
    DEVELOPMENT = "development"
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
export declare class SchemaValidator {
    private ajv;
    private compiledValidators;
    constructor();
    /**
     * Validate a configuration with specified options
     */
    validate(config: any, schema: any, options?: ValidationOptions): ValidationResult;
    /**
     * Strict validation - all fields required, full type checking
     */
    private strictValidation;
    /**
     * Loose validation - optional fields allowed, basic type checking
     */
    private looseValidation;
    /**
     * Development validation - minimal checks, maximum flexibility
     */
    private devValidation;
    /**
     * Get or compile a validator for a schema
     */
    private getValidator;
    /**
     * Make schema loose by removing required fields
     */
    private makeSchemaLoose;
    /**
     * Check if an AJV error is critical
     */
    private isCriticalError;
    /**
     * Format AJV error to our format
     */
    private formatAjvError;
    /**
     * Apply custom validation rules
     */
    private applyCustomRules;
    /**
     * Check for deprecated fields (stub for integration with DeprecationManager)
     */
    private checkDeprecatedFields;
    /**
     * Get nested value from object using dot notation
     */
    private getNestedValue;
    /**
     * Clear compiled validator cache
     */
    clearCache(): void;
}
//# sourceMappingURL=SchemaValidator.d.ts.map