/**
 * Schema Defaults
 *
 * Centralized repository for default values used across the schema.
 * Provides type-safe default application for configurations.
 */

import type { FormPreferences, ItemConfig } from '../interfaces';

export class SchemaDefaults {
  /**
   * Default values for FormPreferences
   */
  static readonly FormPreferences = {
    addSaveBtn: false,
    saveLimit: null,
    saveUrl: undefined,
  } as const;

  /**
   * Default values for ItemConfig editing settings
   */
  static readonly ItemConfigEditing = {
    allowAdding: false,
    allowUpdating: false,
    allowDeleting: false,
    mode: 'row' as const,
  };

  /**
   * Default values for ItemConfig
   */
  static readonly ItemConfig: Partial<ItemConfig> = {
    editing: SchemaDefaults.ItemConfigEditing,
    items: [],
  };

  /**
   * Default values for GroupFieldConfig
   */
  static readonly GroupFieldConfig = {
    colCount: 1, // DevExtreme default
    excludeFromPath: false,
  } as const;

  /**
   * Default values for Tree/Grid ItemConfig (DevExtreme-specific display options)
   */
  static readonly TreeItemConfig = {
    autoExpandAll: false,
    showRowLines: true,
    showBorders: true,
    columnAutoWidth: false,
    allowColumnReordering: false,
    allowColumnResizing: true,
    showColumnHeaders: true,
  } as const;

  /**
   * Apply defaults to a partial object
   * @param obj Partial object to fill with defaults
   * @param defaults Complete default object
   * @returns Object with defaults applied
   */
  static applyDefaults<T extends object>(obj: Partial<T>, defaults: T): T {
    return { ...defaults, ...obj };
  }

  /**
   * Deep merge defaults with object
   * @param obj Partial object to fill with defaults
   * @param defaults Complete default object
   * @returns Deep merged object
   */
  static deepApplyDefaults<T extends object>(obj: Partial<T>, defaults: T): T {
    const result = { ...defaults };

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const defaultValue = defaults[key];

        if (
          value !== null &&
          value !== undefined &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          typeof defaultValue === 'object' &&
          !Array.isArray(defaultValue)
        ) {
          // Recursive merge for nested objects
          (result as any)[key] = this.deepApplyDefaults(value as any, defaultValue as any);
        } else {
          // Direct assignment for primitives and arrays
          (result as any)[key] = value;
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
  static createFormPreferences(overrides: Partial<FormPreferences> = {}): FormPreferences {
    return this.deepApplyDefaults(overrides, this.FormPreferences);
  }
}

/**
 * Helper function for quick default application
 */
export function withDefaults<T extends object>(obj: Partial<T>, defaults: T): T {
  return SchemaDefaults.applyDefaults(obj, defaults);
}

/**
 * Helper function for deep default application
 */
export function withDeepDefaults<T extends object>(obj: Partial<T>, defaults: T): T {
  return SchemaDefaults.deepApplyDefaults(obj, defaults);
}
