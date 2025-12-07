/**
 * SchemaVersionManager Tests
 *
 * Tests for version management and migration functionality
 */

import { SchemaVersionManager, SchemaMigration } from '../../core/SchemaVersionManager';

describe('SchemaVersionManager', () => {
  let versionManager: SchemaVersionManager;

  beforeEach(() => {
    versionManager = new SchemaVersionManager();
  });

  describe('Migration Registration', () => {
    it('should register a single migration', () => {
      const migration: SchemaMigration = {
        fromVersion: '1.0.0',
        toVersion: '2.0.0',
        migrate: (config) => config,
      };

      versionManager.registerMigration(migration);
      const migrations = versionManager.getMigrations();

      expect(migrations).toHaveLength(1);
      expect(migrations[0]).toEqual(migration);
    });

    it('should register multiple migrations', () => {
      const migrations: SchemaMigration[] = [
        {
          fromVersion: '1.0.0',
          toVersion: '2.0.0',
          migrate: (config) => config,
        },
        {
          fromVersion: '2.0.0',
          toVersion: '3.0.0',
          migrate: (config) => config,
        },
      ];

      versionManager.registerMigrations(migrations);

      expect(versionManager.getMigrations()).toHaveLength(2);
    });
  });

  describe('Version Migration', () => {
    beforeEach(() => {
      const migration: SchemaMigration = {
        fromVersion: '1.0.0',
        toVersion: '2.0.0',
        migrate: (oldConfig) => ({
          ...oldConfig,
          newField: 'added',
          version: '2.0.0',
        }),
      };

      versionManager.registerMigration(migration);
    });

    it('should migrate config from v1.0.0 to v2.0.0', () => {
      const oldConfig = {
        title: 'Test',
        version: '1.0.0',
      };

      const migrated = versionManager.migrate(oldConfig, '2.0.0');

      expect(migrated.version).toBe('2.0.0');
      expect(migrated.newField).toBe('added');
      expect(migrated.title).toBe('Test');
    });

    it('should not migrate if versions match', () => {
      const config = {
        title: 'Test',
        version: '2.0.0',
      };

      const result = versionManager.migrate(config, '2.0.0');

      expect(result).toEqual(config);
    });

    it('should throw error if no migration path exists', () => {
      const config = {
        title: 'Test',
        version: '1.0.0',
      };

      expect(() => {
        versionManager.migrate(config, '3.0.0');
      }).toThrow();
    });
  });

  describe('Migration Chains', () => {
    beforeEach(() => {
      versionManager.registerMigrations([
        {
          fromVersion: '1.0.0',
          toVersion: '2.0.0',
          migrate: (config) => ({ ...config, step1: true, version: '2.0.0' }),
        },
        {
          fromVersion: '2.0.0',
          toVersion: '3.0.0',
          migrate: (config) => ({ ...config, step2: true, version: '3.0.0' }),
        },
      ]);
    });

    it('should execute migration chain', () => {
      const config = {
        title: 'Test',
        version: '1.0.0',
      };

      const migrated = versionManager.migrate(config, '3.0.0');

      expect(migrated.version).toBe('3.0.0');
      expect(migrated.step1).toBe(true);
      expect(migrated.step2).toBe(true);
    });
  });

  describe('Version Comparison', () => {
    it('should check if migration is available', () => {
      versionManager.registerMigration({
        fromVersion: '1.0.0',
        toVersion: '2.0.0',
        migrate: (config) => config,
      });

      expect(versionManager.canMigrate('1.0.0', '2.0.0')).toBe(true);
      expect(versionManager.canMigrate('1.0.0', '3.0.0')).toBe(false);
    });

    it('should check version range', () => {
      expect(versionManager.isVersionBetween('1.5.0', '1.0.0', '2.0.0')).toBe(true);
      expect(versionManager.isVersionBetween('0.5.0', '1.0.0', '2.0.0')).toBe(false);
      expect(versionManager.isVersionBetween('2.5.0', '1.0.0', '2.0.0')).toBe(false);
    });
  });
});
