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
export declare class DeprecationManager {
    private deprecations;
    private warningShown;
    private enableLogging;
    /**
     * Mark a field as deprecated
     */
    markAsDeprecated(field: DeprecatedField): void;
    /**
     * Mark multiple fields as deprecated
     */
    markMultipleAsDeprecated(fields: DeprecatedField[]): void;
    /**
     * Check configuration for deprecated fields
     */
    checkDeprecations(config: any, path?: string): DeprecationWarning[];
    /**
     * Migrate deprecated fields to new structure
     */
    migrateDeprecated(config: any): {
        migrated: any;
        warnings: DeprecationWarning[];
    };
    /**
     * Apply migration helpers to deprecated fields
     */
    private applyMigrations;
    /**
     * Check if a field is deprecated
     */
    isDeprecated(fieldName: string): boolean;
    /**
     * Get deprecation info for a field
     */
    getDeprecationInfo(fieldName: string): DeprecatedField | undefined;
    /**
     * Get all deprecations
     */
    getAllDeprecations(): Map<string, DeprecatedField>;
    /**
     * Enable or disable console logging
     */
    setLogging(enabled: boolean): void;
    /**
     * Reset warning shown tracking
     */
    resetWarnings(): void;
    /**
     * Build deprecation message
     */
    private buildDeprecationMessage;
    /**
     * Log warning to console
     */
    private logWarning;
    /**
     * Set nested value in object using dot notation
     */
    private setNestedValue;
}
/**
 * Get the singleton instance of DeprecationManager
 */
export declare function getDeprecationManager(): DeprecationManager;
//# sourceMappingURL=DeprecationManager.d.ts.map