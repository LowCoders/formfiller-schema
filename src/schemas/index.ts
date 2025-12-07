// Import transformed schema from dist if available (for better Monaco/unevaluatedProperties support)
// Falls back to src schema during development
let completeSchema: any;

try {
  // Try to use the transformed dist schema first
  completeSchema = require('../../dist/schemas/complete-schema.json');
} catch {
  // Fallback to src schema (before build)
  completeSchema = require('./complete-schema.json');
}

export { completeSchema };
