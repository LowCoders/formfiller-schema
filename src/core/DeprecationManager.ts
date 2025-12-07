/**
 * Deprecation Manager
 *
 * Manages deprecated fields and provides warnings for their usage.
 * Helps with smooth transitions between schema versions.
 */

export interface DeprecatedField {
  fieldName: string;
  deprecatedIn: string;
  removedIn?: string;
  replacement?: string;
  migrationHelper?: (oldValue: any) => any;
  message?: string;
}

export interface DeprecationWarning {
  field: string;
  message: string;
  replacement?: string;
  suggestion?: string;
}

export class DeprecationManager {
  private deprecations: Map<string, DeprecatedField> = new Map();
  private warningShown: Set<string> = new Set();
  private enableLogging: boolean = true;

  /**
   * Mark a field as deprecated
   */
  markAsDeprecated(field: DeprecatedField): void {
    this.deprecations.set(field.fieldName, field);
  }

  /**
   * Mark multiple fields as deprecated
   */
  markMultipleAsDeprecated(fields: DeprecatedField[]): void {
    fields.forEach((field) => this.markAsDeprecated(field));
  }

  /**
   * Check configuration for deprecated fields
   */
  checkDeprecations(config: any, path: string = ''): DeprecationWarning[] {
    const warnings: DeprecationWarning[] = [];

    if (!config || typeof config !== 'object') {
      return warnings;
    }

    for (const [key, value] of Object.entries(config)) {
      const fullPath = path ? `${path}.${key}` : key;
      const deprecation = this.deprecations.get(fullPath);

      if (deprecation) {
        const warning: DeprecationWarning = {
          field: fullPath,
          message: this.buildDeprecationMessage(deprecation),
          replacement: deprecation.replacement,
        };

        if (deprecation.replacement) {
          warning.suggestion = `Use "${deprecation.replacement}" instead`;
        }

        warnings.push(warning);

        // Log warning to console (once per field)
        if (this.enableLogging && !this.warningShown.has(fullPath)) {
          this.logWarning(warning);
          this.warningShown.add(fullPath);
        }
      }

      // Recursively check nested objects
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        warnings.push(...this.checkDeprecations(value, fullPath));
      }
    }

    return warnings;
  }

  /**
   * Migrate deprecated fields to new structure
   */
  migrateDeprecated(config: any): { migrated: any; warnings: DeprecationWarning[] } {
    const warnings = this.checkDeprecations(config);
    const migrated = this.applyMigrations(JSON.parse(JSON.stringify(config)));

    return { migrated, warnings };
  }

  /**
   * Apply migration helpers to deprecated fields
   */
  private applyMigrations(config: any, path: string = ''): any {
    if (!config || typeof config !== 'object') {
      return config;
    }

    const result = Array.isArray(config) ? [...config] : { ...config };

    for (const [key, value] of Object.entries(result)) {
      const fullPath = path ? `${path}.${key}` : key;
      const deprecation = this.deprecations.get(fullPath);

      if (deprecation && deprecation.migrationHelper) {
        // Apply migration helper
        const migratedValue = deprecation.migrationHelper(value);

        // Remove old field
        delete (result as any)[key];

        // Add new field if replacement is specified
        if (deprecation.replacement) {
          this.setNestedValue(result, deprecation.replacement, migratedValue);
        }
      } else if (value && typeof value === 'object') {
        // Recursively migrate nested objects
        (result as any)[key] = this.applyMigrations(value, fullPath);
      }
    }

    return result;
  }

  /**
   * Check if a field is deprecated
   */
  isDeprecated(fieldName: string): boolean {
    return this.deprecations.has(fieldName);
  }

  /**
   * Get deprecation info for a field
   */
  getDeprecationInfo(fieldName: string): DeprecatedField | undefined {
    return this.deprecations.get(fieldName);
  }

  /**
   * Get all deprecations
   */
  getAllDeprecations(): Map<string, DeprecatedField> {
    return new Map(this.deprecations);
  }

  /**
   * Enable or disable console logging
   */
  setLogging(enabled: boolean): void {
    this.enableLogging = enabled;
  }

  /**
   * Reset warning shown tracking
   */
  resetWarnings(): void {
    this.warningShown.clear();
  }

  /**
   * Build deprecation message
   */
  private buildDeprecationMessage(deprecation: DeprecatedField): string {
    if (deprecation.message) {
      return deprecation.message;
    }

    let message = `Field "${deprecation.fieldName}" is deprecated since version ${deprecation.deprecatedIn}`;

    if (deprecation.removedIn) {
      message += ` and will be removed in version ${deprecation.removedIn}`;
    }

    if (deprecation.replacement) {
      message += `. Use "${deprecation.replacement}" instead`;
    }

    return message;
  }

  /**
   * Log warning to console
   */
  private logWarning(warning: DeprecationWarning): void {
    console.warn(
      `⚠️ [Deprecation] ${warning.message}`,
      warning.suggestion ? `\n   ${warning.suggestion}` : ''
    );
  }

  /**
   * Set nested value in object using dot notation
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
  }
}

// Singleton instance
let instance: DeprecationManager | null = null;

/**
 * Get the singleton instance of DeprecationManager
 */
export function getDeprecationManager(): DeprecationManager {
  if (!instance) {
    instance = new DeprecationManager();
    // Register known deprecations
    registerKnownDeprecations(instance);
  }
  return instance;
}

/**
 * Register known deprecated fields from v1 to v2
 */
function registerKnownDeprecations(manager: DeprecationManager): void {
  manager.markMultipleAsDeprecated([
    {
      fieldName: 'addSaveBtn',
      deprecatedIn: '2.0.0',
      removedIn: '3.0.0',
      replacement: 'preferences.addSaveBtn',
      migrationHelper: (value) => ({ preferences: { addSaveBtn: value } }),
      message: 'addSaveBtn should be moved to preferences object',
    },
    {
      fieldName: 'columns',
      deprecatedIn: '2.0.0',
      removedIn: '3.0.0',
      replacement: 'items',
      migrationHelper: (value) => value,
      message: 'Use "items" instead of "columns" for consistency across all types',
    },
  ]);
}
