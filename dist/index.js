"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.getMigrationRegistry = exports.MigrationRegistry = exports.v1ToV2Migration = exports.createPerformanceMonitor = exports.getPerformanceMonitor = exports.PerformanceMonitor = exports.createSchemaCache = exports.getSchemaCache = exports.SchemaCache = exports.getDeprecationManager = exports.DeprecationManager = exports.withDeepDefaults = exports.withDefaults = exports.SchemaDefaults = exports.ValidationLevel = exports.SchemaValidator = exports.getVersionManager = exports.SchemaVersionManager = void 0;
exports.validateField = validateField;
exports.validateItem = validateItem;
exports.validateView = validateView;
const interfaces = __importStar(require("./interfaces"));
// Use AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties)
const _2019_1 = __importDefault(require("ajv/dist/2019"));
const schemas_1 = require("./schemas");
// Export all interfaces
__exportStar(require("./interfaces"), exports);
// Export core utilities (v2.1.0 optimization features)
// Note: Avoid name conflicts by explicitly managing exports
var core_1 = require("./core");
Object.defineProperty(exports, "SchemaVersionManager", { enumerable: true, get: function () { return core_1.SchemaVersionManager; } });
Object.defineProperty(exports, "getVersionManager", { enumerable: true, get: function () { return core_1.getVersionManager; } });
Object.defineProperty(exports, "SchemaValidator", { enumerable: true, get: function () { return core_1.SchemaValidator; } });
Object.defineProperty(exports, "ValidationLevel", { enumerable: true, get: function () { return core_1.ValidationLevel; } });
Object.defineProperty(exports, "SchemaDefaults", { enumerable: true, get: function () { return core_1.SchemaDefaults; } });
Object.defineProperty(exports, "withDefaults", { enumerable: true, get: function () { return core_1.withDefaults; } });
Object.defineProperty(exports, "withDeepDefaults", { enumerable: true, get: function () { return core_1.withDeepDefaults; } });
Object.defineProperty(exports, "DeprecationManager", { enumerable: true, get: function () { return core_1.DeprecationManager; } });
Object.defineProperty(exports, "getDeprecationManager", { enumerable: true, get: function () { return core_1.getDeprecationManager; } });
Object.defineProperty(exports, "SchemaCache", { enumerable: true, get: function () { return core_1.SchemaCache; } });
Object.defineProperty(exports, "getSchemaCache", { enumerable: true, get: function () { return core_1.getSchemaCache; } });
Object.defineProperty(exports, "createSchemaCache", { enumerable: true, get: function () { return core_1.createSchemaCache; } });
Object.defineProperty(exports, "PerformanceMonitor", { enumerable: true, get: function () { return core_1.PerformanceMonitor; } });
Object.defineProperty(exports, "getPerformanceMonitor", { enumerable: true, get: function () { return core_1.getPerformanceMonitor; } });
Object.defineProperty(exports, "createPerformanceMonitor", { enumerable: true, get: function () { return core_1.createPerformanceMonitor; } });
var migrations_1 = require("./migrations");
Object.defineProperty(exports, "v1ToV2Migration", { enumerable: true, get: function () { return migrations_1.v1ToV2Migration; } });
Object.defineProperty(exports, "MigrationRegistry", { enumerable: true, get: function () { return migrations_1.MigrationRegistry; } });
Object.defineProperty(exports, "getMigrationRegistry", { enumerable: true, get: function () { return migrations_1.getMigrationRegistry; } });
// NOTE: Generators are NOT exported in main bundle (Node.js only)
// They use 'fs' and 'path' which are not available in browser
// Import them separately if needed in Node.js environment:
// import { TypeGenerator } from 'formfiller-schema/dist/generators';
// import { DocGenerator } from 'formfiller-schema/dist/generators';
// Schema validation functions
const ajv = new _2019_1.default({
    allErrors: true,
    strict: false,
    validateFormats: false,
});
const validateFieldConfig = ajv.compile({
    $ref: '#/definitions/FieldConfig',
    definitions: schemas_1.completeSchema.definitions,
});
const validateItemConfig = ajv.compile({
    $ref: '#/definitions/ItemConfig',
    definitions: schemas_1.completeSchema.definitions,
});
// Backward compatibility alias
const validateViewConfig = validateItemConfig;
/**
 * Validates a field configuration against the schema
 * @param fieldConfig Field configuration to validate
 * @returns Validation result with errors if any
 */
function validateField(fieldConfig) {
    const valid = validateFieldConfig(fieldConfig);
    return {
        valid,
        errors: validateFieldConfig.errors || [],
    };
}
/**
 * Validates an item configuration against the schema
 * @param itemConfig Item configuration to validate
 * @returns Validation result with errors if any
 */
function validateItem(itemConfig) {
    const valid = validateItemConfig(itemConfig);
    return {
        valid,
        errors: validateItemConfig.errors || [],
    };
}
/**
 * Validates a view configuration against the schema
 * @deprecated Use validateItem instead - ViewConfig is now ItemConfig
 * @param viewConfig View configuration to validate
 * @returns Validation result with errors if any
 */
function validateView(viewConfig) {
    return validateItem(viewConfig);
}
// Export schemas for external use
exports.schemas = {
    completeSchema: schemas_1.completeSchema,
};
/**
 * Convenience getter functions for singleton instances
 *
 * @example
 * ```typescript
 * import { getVersionManager, getSchemaCache, getPerformanceMonitor } from 'formfiller-schema';
 *
 * // Use version manager
 * const migrated = getVersionManager().migrate(oldConfig, '2.0.0');
 *
 * // Use cache
 * const validator = getSchemaCache().getValidator('mySchema', schema);
 *
 * // Monitor performance
 * const result = getPerformanceMonitor().measure('validation', () => validator(config));
 * ```
 */
// Default export
exports.default = {
    interfaces,
    validateField,
    validateItem,
    validateView, // deprecated, kept for backward compatibility
    schemas: // deprecated, kept for backward compatibility
    exports.schemas,
};
