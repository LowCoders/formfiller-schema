// Import complete-schema.json directly
// TypeScript compiles this with resolveJsonModule
// Bundlers (Vite) will inline the JSON as a JS object
import completeSchemaData from './complete-schema.json' with { type: 'json' };

export const completeSchema = completeSchemaData;
