/**
 * Schema Defaults
 *
 * Centralized repository for default values used across the schema.
 * Provides type-safe default application for configurations.
 */
export class SchemaDefaults {
    /**
     * Default values for FormPreferences
     */
    static FormPreferences = {
        addSaveBtn: false,
        saveLimit: null,
        saveUrl: undefined,
    };
    /**
     * Default values for ItemConfig editing settings
     */
    static ItemConfigEditing = {
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        mode: 'row',
    };
    /**
     * Default values for ItemConfig
     */
    static ItemConfig = {
        editing: SchemaDefaults.ItemConfigEditing,
        items: [],
    };
    /**
     * Default values for GroupFieldConfig
     */
    static GroupFieldConfig = {
        colCount: 1, // DevExtreme default
        excludeFromPath: false,
    };
    /**
     * Default values for Tree/Grid ItemConfig (DevExtreme-specific display options)
     */
    static TreeItemConfig = {
        autoExpandAll: false,
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: false,
        allowColumnReordering: false,
        allowColumnResizing: true,
        showColumnHeaders: true,
    };
    /**
     * Apply defaults to a partial object
     * @param obj Partial object to fill with defaults
     * @param defaults Complete default object
     * @returns Object with defaults applied
     */
    static applyDefaults(obj, defaults) {
        return { ...defaults, ...obj };
    }
    /**
     * Deep merge defaults with object
     * @param obj Partial object to fill with defaults
     * @param defaults Complete default object
     * @returns Deep merged object
     */
    static deepApplyDefaults(obj, defaults) {
        const result = { ...defaults };
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const defaultValue = defaults[key];
                if (value !== null &&
                    value !== undefined &&
                    typeof value === 'object' &&
                    !Array.isArray(value) &&
                    typeof defaultValue === 'object' &&
                    !Array.isArray(defaultValue)) {
                    // Recursive merge for nested objects
                    result[key] = this.deepApplyDefaults(value, defaultValue);
                }
                else {
                    // Direct assignment for primitives and arrays
                    result[key] = value;
                }
            }
        }
        return result;
    }
    /**
     * Get default FormPreferences
     */
    static getFormPreferences() {
        return { ...this.FormPreferences };
    }
    /**
     * Create a new FormPreferences with custom overrides
     */
    static createFormPreferences(overrides = {}) {
        return this.deepApplyDefaults(overrides, this.FormPreferences);
    }
}
/**
 * Helper function for quick default application
 */
export function withDefaults(obj, defaults) {
    return SchemaDefaults.applyDefaults(obj, defaults);
}
/**
 * Helper function for deep default application
 */
export function withDeepDefaults(obj, defaults) {
    return SchemaDefaults.deepApplyDefaults(obj, defaults);
}
