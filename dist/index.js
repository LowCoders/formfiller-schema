import * as interfaces from './interfaces/index.js';
// Use AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties)
import Ajv2019pkg from 'ajv/dist/2019.js';
const Ajv2019 = Ajv2019pkg.default || Ajv2019pkg;
import { completeSchema } from './schemas/index.js';
// Export all interfaces
export * from './interfaces/index.js';
// Export core utilities (v2.1.0 optimization features)
// Note: Avoid name conflicts by explicitly managing exports
export { SchemaVersionManager, getVersionManager, SchemaValidator, ValidationLevel, SchemaDefaults, withDefaults, withDeepDefaults, DeprecationManager, getDeprecationManager, SchemaCache, getSchemaCache, createSchemaCache, PerformanceMonitor, getPerformanceMonitor, createPerformanceMonitor, } from './core/index.js';
export { v1ToV2Migration, MigrationRegistry, getMigrationRegistry } from './migrations/index.js';
// NOTE: Generators are NOT exported in main bundle (Node.js only)
// They use 'fs' and 'path' which are not available in browser
// Import them separately if needed in Node.js environment:
// import { TypeGenerator } from 'formfiller-schema/dist/generators';
// import { DocGenerator } from 'formfiller-schema/dist/generators';
// Schema validation functions
const ajv = new Ajv2019({
    allErrors: true,
    strict: false,
    validateFormats: false,
});
const validateFieldConfig = ajv.compile({
    $ref: '#/definitions/FieldConfig',
    definitions: completeSchema.definitions,
});
const validateItemConfig = ajv.compile({
    $ref: '#/definitions/ItemConfig',
    definitions: completeSchema.definitions,
});
// Backward compatibility alias
const validateViewConfig = validateItemConfig;
/**
 * Validates a field configuration against the schema
 * @param fieldConfig Field configuration to validate
 * @returns Validation result with errors if any
 */
export function validateField(fieldConfig) {
    const valid = validateFieldConfig(fieldConfig);
    return {
        valid,
        errors: validateFieldConfig.errors || [],
    };
}
/**
 * Validates an item configuration against the schema
 * @param itemConfig Item configuration to validate
 * @returns Validation result with errors if any
 */
export function validateItem(itemConfig) {
    const valid = validateItemConfig(itemConfig);
    return {
        valid,
        errors: validateItemConfig.errors || [],
    };
}
/**
 * Validates a view configuration against the schema
 * @deprecated Use validateItem instead - ViewConfig is now ItemConfig
 * @param viewConfig View configuration to validate
 * @returns Validation result with errors if any
 */
export function validateView(viewConfig) {
    return validateItem(viewConfig);
}
// Export schemas for external use
export const schemas = {
    completeSchema,
};
/**
 * Convenience getter functions for singleton instances
 *
 * @example
 * ```typescript
 * import { getVersionManager, getSchemaCache, getPerformanceMonitor } from 'formfiller-schema';
 *
 * // Use version manager
 * const migrated = getVersionManager().migrate(oldConfig, '2.0.0');
 *
 * // Use cache
 * const validator = getSchemaCache().getValidator('mySchema', schema);
 *
 * // Monitor performance
 * const result = getPerformanceMonitor().measure('validation', () => validator(config));
 * ```
 */
// Default export
export default {
    interfaces,
    validateField,
    validateItem,
    validateView, // deprecated, kept for backward compatibility
    schemas,
};
