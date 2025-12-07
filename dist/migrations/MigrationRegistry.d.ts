/**
 * Migration Registry
 *
 * Central registry for all schema migrations.
 * Auto-registers migrations and provides easy access.
 */
import { SchemaMigration, SchemaVersionManager } from '../core/SchemaVersionManager';
export declare class MigrationRegistry {
    private versionManager;
    constructor(versionManager?: SchemaVersionManager);
    /**
     * Register all known migrations
     */
    private registerAllMigrations;
    /**
     * Get the version manager
     */
    getVersionManager(): SchemaVersionManager;
    /**
     * Migrate a configuration to the latest version
     */
    migrateToLatest(config: any, latestVersion?: string): any;
    /**
     * Check if config needs migration
     */
    needsMigration(config: any, targetVersion?: string): boolean;
    /**
     * Get available migrations
     */
    getAvailableMigrations(): ReadonlyArray<SchemaMigration>;
}
/**
 * Get the singleton instance of MigrationRegistry
 */
export declare function getMigrationRegistry(): MigrationRegistry;
