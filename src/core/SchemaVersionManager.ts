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

export class SchemaVersionManager {
  private migrations: SchemaMigration[] = [];

  /**
   * Register a migration path
   */
  registerMigration(migration: SchemaMigration): void {
    this.migrations.push(migration);
  }

  /**
   * Register multiple migrations at once
   */
  registerMigrations(migrations: SchemaMigration[]): void {
    this.migrations.push(...migrations);
  }

  /**
   * Migrate a configuration to a target version
   */
  migrate(config: any, targetVersion: string): any {
    const currentVersion = config.version || '1.0.0';

    if (currentVersion === targetVersion) {
      return config;
    }

    // Build migration chain
    const chain = this.buildMigrationChain(currentVersion, targetVersion);

    if (chain.length === 0) {
      throw new Error(`No migration path found from version ${currentVersion} to ${targetVersion}`);
    }

    // Execute migration chain
    let result = config;
    for (const migration of chain) {
      result = migration.migrate(result);
      result.version = migration.toVersion;
    }

    return result;
  }

  /**
   * Check if migration is available between versions
   */
  canMigrate(fromVersion: string, toVersion: string): boolean {
    return this.buildMigrationChain(fromVersion, toVersion).length > 0;
  }

  /**
   * Get all registered migrations
   */
  getMigrations(): ReadonlyArray<SchemaMigration> {
    return this.migrations;
  }

  /**
   * Build a migration chain from source to target version
   */
  private buildMigrationChain(fromVersion: string, toVersion: string): SchemaMigration[] {
    const chain: SchemaMigration[] = [];
    let currentVersion = fromVersion;

    // Simple linear search for migration path
    // For more complex scenarios, implement graph-based path finding
    while (currentVersion !== toVersion) {
      const nextMigration = this.migrations.find(
        (m) =>
          m.fromVersion === currentVersion && this.isVersionLessThanOrEqual(m.toVersion, toVersion)
      );

      if (!nextMigration) {
        // No direct path found, return empty chain
        return [];
      }

      chain.push(nextMigration);
      currentVersion = nextMigration.toVersion;
    }

    return chain;
  }

  /**
   * Check if version is between two versions (inclusive)
   */
  isVersionBetween(version: string, minVersion: string, maxVersion: string): boolean {
    return (
      this.isVersionGreaterThanOrEqual(version, minVersion) &&
      this.isVersionLessThanOrEqual(version, maxVersion)
    );
  }

  /**
   * Compare versions (simple semantic versioning)
   */
  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;

      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }

    return 0;
  }

  private isVersionGreaterThanOrEqual(v1: string, v2: string): boolean {
    return this.compareVersions(v1, v2) >= 0;
  }

  private isVersionLessThanOrEqual(v1: string, v2: string): boolean {
    return this.compareVersions(v1, v2) <= 0;
  }
}

// Singleton instance
let instance: SchemaVersionManager | null = null;

/**
 * Get the singleton instance of SchemaVersionManager
 */
export function getVersionManager(): SchemaVersionManager {
  if (!instance) {
    instance = new SchemaVersionManager();
  }
  return instance;
}
