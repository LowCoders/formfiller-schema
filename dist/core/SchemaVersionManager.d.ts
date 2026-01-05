/**
 * Schema Version Manager
 *
 * Handles schema version migrations between different versions.
 * Supports automatic migration chains and version compatibility checks.
 */
export interface SchemaMigration {
    fromVersion: string;
    toVersion: string;
    migrate: (oldConfig: any) => any;
    description?: string;
}
export declare class SchemaVersionManager {
    private migrations;
    /**
     * Register a migration path
     */
    registerMigration(migration: SchemaMigration): void;
    /**
     * Register multiple migrations at once
     */
    registerMigrations(migrations: SchemaMigration[]): void;
    /**
     * Migrate a configuration to a target version
     */
    migrate(config: any, targetVersion: string): any;
    /**
     * Check if migration is available between versions
     */
    canMigrate(fromVersion: string, toVersion: string): boolean;
    /**
     * Get all registered migrations
     */
    getMigrations(): ReadonlyArray<SchemaMigration>;
    /**
     * Build a migration chain from source to target version
     */
    private buildMigrationChain;
    /**
     * Check if version is between two versions (inclusive)
     */
    isVersionBetween(version: string, minVersion: string, maxVersion: string): boolean;
    /**
     * Compare versions (simple semantic versioning)
     */
    private compareVersions;
    private isVersionGreaterThanOrEqual;
    private isVersionLessThanOrEqual;
}
/**
 * Get the singleton instance of SchemaVersionManager
 */
export declare function getVersionManager(): SchemaVersionManager;
//# sourceMappingURL=SchemaVersionManager.d.ts.map