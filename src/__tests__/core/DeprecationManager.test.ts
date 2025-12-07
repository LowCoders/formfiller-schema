/**
 * DeprecationManager Tests
 *
 * Tests for deprecated field management
 */

import { DeprecationManager, getDeprecationManager } from '../../core/DeprecationManager';

describe('DeprecationManager', () => {
  let manager: DeprecationManager;

  beforeEach(() => {
    manager = new DeprecationManager();
    manager.setLogging(false); // Disable console warnings in tests
  });

  describe('Field Registration', () => {
    it('should register deprecated field', () => {
      manager.markAsDeprecated({
        fieldName: 'oldField',
        deprecatedIn: '2.0.0',
        removedIn: '3.0.0',
        replacement: 'newField',
      });

      expect(manager.isDeprecated('oldField')).toBe(true);
    });

    it('should register multiple fields', () => {
      manager.markMultipleAsDeprecated([
        {
          fieldName: 'field1',
          deprecatedIn: '2.0.0',
        },
        {
          fieldName: 'field2',
          deprecatedIn: '2.0.0',
        },
      ]);

      expect(manager.isDeprecated('field1')).toBe(true);
      expect(manager.isDeprecated('field2')).toBe(true);
    });

    it('should get deprecation info', () => {
      const field = {
        fieldName: 'oldField',
        deprecatedIn: '2.0.0',
        removedIn: '3.0.0',
        replacement: 'newField',
      };

      manager.markAsDeprecated(field);

      const info = manager.getDeprecationInfo('oldField');
      expect(info).toEqual(field);
    });
  });

  describe('Check Deprecations', () => {
    beforeEach(() => {
      manager.markAsDeprecated({
        fieldName: 'addSaveBtn',
        deprecatedIn: '2.0.0',
        removedIn: '3.0.0',
        replacement: 'preferences.addSaveBtn',
      });
    });

    it('should detect deprecated fields', () => {
      const config = {
        title: 'Test',
        addSaveBtn: true,
      };

      const warnings = manager.checkDeprecations(config);

      expect(warnings).toHaveLength(1);
      expect(warnings[0].field).toBe('addSaveBtn');
    });

    it('should not warn for non-deprecated fields', () => {
      const config = {
        title: 'Test',
        preferences: {
          addSaveBtn: true,
        },
      };

      const warnings = manager.checkDeprecations(config);

      expect(warnings).toHaveLength(0);
    });

    it('should detect nested deprecated fields', () => {
      manager.markAsDeprecated({
        fieldName: 'config.oldProp',
        deprecatedIn: '2.0.0',
      });

      const obj = {
        config: {
          oldProp: 'value',
        },
      };

      const warnings = manager.checkDeprecations(obj);

      expect(warnings).toHaveLength(1);
      expect(warnings[0].field).toBe('config.oldProp');
    });

    it('should provide suggestions', () => {
      const config = {
        addSaveBtn: true,
      };

      const warnings = manager.checkDeprecations(config);

      expect(warnings[0].suggestion).toContain('preferences.addSaveBtn');
    });
  });

  describe('Migration', () => {
    beforeEach(() => {
      manager.markAsDeprecated({
        fieldName: 'addSaveBtn',
        deprecatedIn: '2.0.0',
        replacement: 'preferences.addSaveBtn',
        migrationHelper: (value) => value,
      });
    });

    it('should migrate deprecated fields', () => {
      const config = {
        title: 'Test',
        addSaveBtn: true,
      };

      const { migrated } = manager.migrateDeprecated(config);

      expect(migrated.addSaveBtn).toBeUndefined();
      expect(migrated.preferences).toBeDefined();
      expect(migrated.preferences.addSaveBtn).toBe(true);
    });

    it('should return warnings during migration', () => {
      const config = {
        title: 'Test',
        addSaveBtn: true,
      };

      const { warnings } = manager.migrateDeprecated(config);

      expect(warnings).toHaveLength(1);
    });

    it('should not mutate original config', () => {
      const config = {
        title: 'Test',
        addSaveBtn: true,
      };

      manager.migrateDeprecated(config);

      expect(config.addSaveBtn).toBe(true);
    });
  });

  describe('Logging', () => {
    it('should log warnings when enabled', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      manager.setLogging(true);

      manager.markAsDeprecated({
        fieldName: 'test',
        deprecatedIn: '2.0.0',
      });

      manager.checkDeprecations({ test: 'value' });

      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should not log duplicate warnings', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      manager.setLogging(true);

      manager.markAsDeprecated({
        fieldName: 'test',
        deprecatedIn: '2.0.0',
      });

      manager.checkDeprecations({ test: 'value' });
      manager.checkDeprecations({ test: 'value' });

      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

      consoleWarnSpy.mockRestore();
    });

    it('should reset warnings', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      manager.setLogging(true);

      manager.markAsDeprecated({
        fieldName: 'test',
        deprecatedIn: '2.0.0',
      });

      manager.checkDeprecations({ test: 'value' });
      manager.resetWarnings();
      manager.checkDeprecations({ test: 'value' });

      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Singleton', () => {
    it('should return same instance', () => {
      const instance1 = getDeprecationManager();
      const instance2 = getDeprecationManager();

      expect(instance1).toBe(instance2);
    });

    it('should have pre-registered deprecations', () => {
      const instance = getDeprecationManager();

      expect(instance.isDeprecated('addSaveBtn')).toBe(true);
      expect(instance.isDeprecated('columns')).toBe(true);
    });
  });
});
