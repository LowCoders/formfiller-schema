/**
 * SchemaDefaults Tests
 *
 * Tests for default values application
 */

import { SchemaDefaults, withDefaults, withDeepDefaults } from '../../core/SchemaDefaults.js';
import type { FormPreferences } from '../../interfaces/index.js';

describe('SchemaDefaults', () => {
  describe('FormPreferences Defaults', () => {
    it('should provide complete default preferences', () => {
      const defaults = SchemaDefaults.getFormPreferences();

      expect(defaults.addSaveBtn).toBe(false);
      expect(defaults.saveLimit).toBeNull();
    });

    it('should create preferences with overrides', () => {
      const prefs = SchemaDefaults.createFormPreferences({
        addSaveBtn: true,
        saveLimit: 10,
      });

      expect(prefs.addSaveBtn).toBe(true);
      expect(prefs.saveLimit).toBe(10);
    });
  });

  describe('Deep Apply Defaults', () => {
    it('should apply defaults recursively', () => {
      const partial: Partial<FormPreferences> = {
        addSaveBtn: true,
        saveLimit: 5,
      };

      const complete = SchemaDefaults.deepApplyDefaults(partial, SchemaDefaults.FormPreferences);

      expect(complete.addSaveBtn).toBe(true);
      expect(complete.saveLimit).toBe(5);
    });

    it('should handle arrays properly', () => {
      const obj: any = {
        items: [1, 2, 3],
        nested: { value: 10 },
      };

      const defaults = {
        items: [] as number[],
        nested: { value: 0, extra: 'default' },
      };

      const result = SchemaDefaults.deepApplyDefaults(obj, defaults);

      expect(result.items).toEqual([1, 2, 3]);
      expect(result.nested.value).toBe(10);
      expect(result.nested.extra).toBe('default');
    });
  });

  describe('Helper Functions', () => {
    it('withDeepDefaults should work as shorthand', () => {
      const partial: Partial<FormPreferences> = {
        addSaveBtn: true,
        saveLimit: 10,
      };

      const result = withDeepDefaults(partial, SchemaDefaults.FormPreferences);

      expect(result.addSaveBtn).toBe(true);
      expect(result.saveLimit).toBe(10);
    });
  });

  describe('ItemConfig Defaults', () => {
    it('should provide default editing settings', () => {
      const editing = SchemaDefaults.ItemConfigEditing;

      expect(editing.allowAdding).toBe(false);
      expect(editing.allowUpdating).toBe(false);
      expect(editing.allowDeleting).toBe(false);
      expect(editing.mode).toBe('row');
    });
  });
});
