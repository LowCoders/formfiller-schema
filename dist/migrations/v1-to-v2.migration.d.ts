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
export declare const v1ToV2Migration: SchemaMigration;
