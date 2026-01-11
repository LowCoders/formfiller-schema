import * as interfaces from './interfaces/index.js';
export * from './interfaces/index.js';
export { SchemaVersionManager, getVersionManager, SchemaMigration, SchemaValidator, ValidationLevel, ValidationOptions as SchemaValidationOptions, ValidationResult, ValidationError, ValidationWarning, SchemaDefaults, withDefaults, withDeepDefaults, DeprecationManager, getDeprecationManager, DeprecatedField, DeprecationWarning, SchemaCache, getSchemaCache, createSchemaCache, CacheStats, PerformanceMonitor, getPerformanceMonitor, createPerformanceMonitor, PerformanceMetrics, MeasurementResult, } from './core/index.js';
export { v1ToV2Migration, MigrationRegistry, getMigrationRegistry } from './migrations/index.js';
/**
 * Validates a field configuration against the schema
 * @param fieldConfig Field configuration to validate
 * @returns Validation result with errors if any
 */
export declare function validateField(fieldConfig: interfaces.FieldConfig): {
    valid: boolean;
    errors: any[];
};
/**
 * Validates an item configuration against the schema
 * @param itemConfig Item configuration to validate
 * @returns Validation result with errors if any
 */
export declare function validateItem(itemConfig: interfaces.ItemConfig): {
    valid: boolean;
    errors: any[];
};
/**
 * Validates a view configuration against the schema
 * @deprecated Use validateItem instead - ViewConfig is now ItemConfig
 * @param viewConfig View configuration to validate
 * @returns Validation result with errors if any
 */
export declare function validateView(viewConfig: interfaces.ItemConfig): {
    valid: boolean;
    errors: any[];
};
export declare const schemas: {
    completeSchema: {
        $schema: string;
        title: string;
        description: string;
        definitions: {};
    };
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
declare const _default: {
    interfaces: typeof interfaces;
    validateField: typeof validateField;
    validateItem: typeof validateItem;
    validateView: typeof validateView;
    schemas: {
        completeSchema: {
            $schema: string;
            title: string;
            description: string;
            definitions: {};
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map