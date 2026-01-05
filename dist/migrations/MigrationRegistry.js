/**
 * Migration Registry
 *
 * Central registry for all schema migrations.
 * Auto-registers migrations and provides easy access.
 */
import { getVersionManager, } from '../core/SchemaVersionManager.js';
import { v1ToV2Migration } from './v1-to-v2.migration.js';
export class MigrationRegistry {
    versionManager;
    constructor(versionManager) {
        this.versionManager = versionManager || getVersionManager();
        this.registerAllMigrations();
    }
    /**
     * Register all known migrations
     */
    registerAllMigrations() {
        this.versionManager.registerMigration(v1ToV2Migration);
        // Future migrations will be added here:
        // this.versionManager.registerMigration(v2ToV3Migration);
    }
    /**
     * Get the version manager
     */
    getVersionManager() {
        return this.versionManager;
    }
    /**
     * Migrate a configuration to the latest version
     */
    migrateToLatest(config, latestVersion = '2.0.0') {
        return this.versionManager.migrate(config, latestVersion);
    }
    /**
     * Check if config needs migration
     */
    needsMigration(config, targetVersion = '2.0.0') {
        const currentVersion = config.version || '1.0.0';
        return (currentVersion !== targetVersion &&
            this.versionManager.canMigrate(currentVersion, targetVersion));
    }
    /**
     * Get available migrations
     */
    getAvailableMigrations() {
        return this.versionManager.getMigrations();
    }
}
// Singleton instance
let instance = null;
/**
 * Get the singleton instance of MigrationRegistry
 */
export function getMigrationRegistry() {
    if (!instance) {
        instance = new MigrationRegistry();
    }
    return instance;
}
