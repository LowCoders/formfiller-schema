/**
 * Migration from v1.0.0 to v2.0.0
 *
 * Changes:
 * - Rename 'columns' to 'items'
 * - Move 'addSaveBtn' to 'preferences.addSaveBtn'
 * - Add default preferences structure
 * - Update version to 2.0.0
 */

import { SchemaMigration } from '../core/SchemaVersionManager';

export const v1ToV2Migration: SchemaMigration = {
  fromVersion: '1.0.0',
  toVersion: '2.0.0',
  description: 'Migrate from v1.0.0 to v2.0.0: columns->items, add preferences',

  migrate: (oldConfig: any) => {
    const newConfig = { ...oldConfig };

    // Rename 'columns' to 'items' in config
    if (newConfig.config && newConfig.config.columns) {
      newConfig.config.items = newConfig.config.columns;
      delete newConfig.config.columns;
    }

    // Move addSaveBtn to preferences
    if ('addSaveBtn' in newConfig) {
      if (!newConfig.preferences) {
        newConfig.preferences = {};
      }
      newConfig.preferences.addSaveBtn = newConfig.addSaveBtn;
      delete newConfig.addSaveBtn;
    }

    // Ensure preferences has default structure
    if (!newConfig.preferences) {
      newConfig.preferences = {};
    }

    if (!('addSaveBtn' in newConfig.preferences)) {
      newConfig.preferences.addSaveBtn = false;
    }

    if (!('saveLimit' in newConfig.preferences)) {
      newConfig.preferences.saveLimit = null;
    }

    // Update version
    newConfig.version = '2.0.0';

    return newConfig;
  },
};
