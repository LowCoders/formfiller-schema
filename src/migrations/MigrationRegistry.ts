/**
 * Migration Registry
 *
 * Central registry for all schema migrations.
 * Auto-registers migrations and provides easy access.
 */

import {
  SchemaMigration,
  SchemaVersionManager,
  getVersionManager,
} from '../core/SchemaVersionManager';
import { v1ToV2Migration } from './v1-to-v2.migration';

export class MigrationRegistry {
  private versionManager: SchemaVersionManager;

  constructor(versionManager?: SchemaVersionManager) {
    this.versionManager = versionManager || getVersionManager();
    this.registerAllMigrations();
  }

  /**
   * Register all known migrations
   */
  private registerAllMigrations(): void {
    this.versionManager.registerMigration(v1ToV2Migration);

    // Future migrations will be added here:
    // this.versionManager.registerMigration(v2ToV3Migration);
  }

  /**
   * Get the version manager
   */
  getVersionManager(): SchemaVersionManager {
    return this.versionManager;
  }

  /**
   * Migrate a configuration to the latest version
   */
  migrateToLatest(config: any, latestVersion: string = '2.0.0'): any {
    return this.versionManager.migrate(config, latestVersion);
  }

  /**
   * Check if config needs migration
   */
  needsMigration(config: any, targetVersion: string = '2.0.0'): boolean {
    const currentVersion = config.version || '1.0.0';
    return (
      currentVersion !== targetVersion &&
      this.versionManager.canMigrate(currentVersion, targetVersion)
    );
  }

  /**
   * Get available migrations
   */
  getAvailableMigrations(): ReadonlyArray<SchemaMigration> {
    return this.versionManager.getMigrations();
  }
}

// Singleton instance
let instance: MigrationRegistry | null = null;

/**
 * Get the singleton instance of MigrationRegistry
 */
export function getMigrationRegistry(): MigrationRegistry {
  if (!instance) {
    instance = new MigrationRegistry();
  }
  return instance;
}
