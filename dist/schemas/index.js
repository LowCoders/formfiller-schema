"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeSchema = void 0;
// Import transformed schema from dist if available (for better Monaco/unevaluatedProperties support)
// Falls back to src schema during development
let completeSchema;
try {
    // Try to use the transformed dist schema first
    exports.completeSchema = completeSchema = require('../../dist/schemas/complete-schema.json');
}
catch (_a) {
    // Fallback to src schema (before build)
    exports.completeSchema = completeSchema = require('./complete-schema.json');
}
