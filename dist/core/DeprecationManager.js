"use strict";
/**
 * Deprecation Manager
 *
 * Manages deprecated fields and provides warnings for their usage.
 * Helps with smooth transitions between schema versions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeprecationManager = void 0;
exports.getDeprecationManager = getDeprecationManager;
class DeprecationManager {
    constructor() {
        this.deprecations = new Map();
        this.warningShown = new Set();
        this.enableLogging = true;
    }
    /**
     * Mark a field as deprecated
     */
    markAsDeprecated(field) {
        this.deprecations.set(field.fieldName, field);
    }
    /**
     * Mark multiple fields as deprecated
     */
    markMultipleAsDeprecated(fields) {
        fields.forEach((field) => this.markAsDeprecated(field));
    }
    /**
     * Check configuration for deprecated fields
     */
    checkDeprecations(config, path = '') {
        const warnings = [];
        if (!config || typeof config !== 'object') {
            return warnings;
        }
        for (const [key, value] of Object.entries(config)) {
            const fullPath = path ? `${path}.${key}` : key;
            const deprecation = this.deprecations.get(fullPath);
            if (deprecation) {
                const warning = {
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
    migrateDeprecated(config) {
        const warnings = this.checkDeprecations(config);
        const migrated = this.applyMigrations(JSON.parse(JSON.stringify(config)));
        return { migrated, warnings };
    }
    /**
     * Apply migration helpers to deprecated fields
     */
    applyMigrations(config, path = '') {
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
                delete result[key];
                // Add new field if replacement is specified
                if (deprecation.replacement) {
                    this.setNestedValue(result, deprecation.replacement, migratedValue);
                }
            }
            else if (value && typeof value === 'object') {
                // Recursively migrate nested objects
                result[key] = this.applyMigrations(value, fullPath);
            }
        }
        return result;
    }
    /**
     * Check if a field is deprecated
     */
    isDeprecated(fieldName) {
        return this.deprecations.has(fieldName);
    }
    /**
     * Get deprecation info for a field
     */
    getDeprecationInfo(fieldName) {
        return this.deprecations.get(fieldName);
    }
    /**
     * Get all deprecations
     */
    getAllDeprecations() {
        return new Map(this.deprecations);
    }
    /**
     * Enable or disable console logging
     */
    setLogging(enabled) {
        this.enableLogging = enabled;
    }
    /**
     * Reset warning shown tracking
     */
    resetWarnings() {
        this.warningShown.clear();
    }
    /**
     * Build deprecation message
     */
    buildDeprecationMessage(deprecation) {
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
    logWarning(warning) {
        console.warn(`⚠️ [Deprecation] ${warning.message}`, warning.suggestion ? `\n   ${warning.suggestion}` : '');
    }
    /**
     * Set nested value in object using dot notation
     */
    setNestedValue(obj, path, value) {
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
exports.DeprecationManager = DeprecationManager;
// Singleton instance
let instance = null;
/**
 * Get the singleton instance of DeprecationManager
 */
function getDeprecationManager() {
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
function registerKnownDeprecations(manager) {
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
