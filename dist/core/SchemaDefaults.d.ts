/**
 * Schema Defaults
 *
 * Centralized repository for default values used across the schema.
 * Provides type-safe default application for configurations.
 */
import type { FormPreferences, ItemConfig } from '../interfaces/index.js';
export declare class SchemaDefaults {
    /**
     * Default values for FormPreferences
     */
    static readonly FormPreferences: {
        readonly addSaveBtn: false;
        readonly saveLimit: null;
        readonly saveUrl: undefined;
    };
    /**
     * Default values for ItemConfig editing settings
     */
    static readonly ItemConfigEditing: {
        allowAdding: boolean;
        allowUpdating: boolean;
        allowDeleting: boolean;
        mode: "row";
    };
    /**
     * Default values for ItemConfig
     */
    static readonly ItemConfig: Partial<ItemConfig>;
    /**
     * Default values for GroupFieldConfig
     */
    static readonly GroupFieldConfig: {
        readonly colCount: 1;
        readonly excludeFromPath: false;
    };
    /**
     * Default values for Tree/Grid ItemConfig (DevExtreme-specific display options)
     */
    static readonly TreeItemConfig: {
        readonly autoExpandAll: false;
        readonly showRowLines: true;
        readonly showBorders: true;
        readonly columnAutoWidth: false;
        readonly allowColumnReordering: false;
        readonly allowColumnResizing: true;
        readonly showColumnHeaders: true;
    };
    /**
     * Apply defaults to a partial object
     * @param obj Partial object to fill with defaults
     * @param defaults Complete default object
     * @returns Object with defaults applied
     */
    static applyDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
    /**
     * Deep merge defaults with object
     * @param obj Partial object to fill with defaults
     * @param defaults Complete default object
     * @returns Deep merged object
     */
    static deepApplyDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
    /**
     * Get default FormPreferences
     */
    static getFormPreferences(): {
        addSaveBtn: false;
        saveLimit: null;
        saveUrl: undefined;
    };
    /**
     * Create a new FormPreferences with custom overrides
     */
    static createFormPreferences(overrides?: Partial<FormPreferences>): FormPreferences;
}
/**
 * Helper function for quick default application
 */
export declare function withDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
/**
 * Helper function for deep default application
 */
export declare function withDeepDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
//# sourceMappingURL=SchemaDefaults.d.ts.map