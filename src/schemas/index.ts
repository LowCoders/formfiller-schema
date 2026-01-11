/**
 * Schema exports
 * 
 * Note: complete-schema.json in src/schemas is a placeholder for TypeScript compilation.
 * The actual schema is generated during build:
 * 1. generate-schema.ts creates raw-schema.json from TypeScript interfaces
 * 2. transform-schema.ts transforms it into Monaco-optimized complete-schema.json in dist/
 * 
 * Applications should import from 'formfiller-schema/dist/schemas/complete-schema.json'
 */
import completeSchemaData from './complete-schema.json' with { type: 'json' };

export const completeSchema = completeSchemaData;
