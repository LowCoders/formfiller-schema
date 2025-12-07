/**
 * TypeScript Type Generator
 *
 * Conceptual implementation for generating TypeScript types from JSON Schema.
 * Uses json-schema-to-typescript library for type generation.
 *
 * Note: This is a manual tool, not integrated into the build process.
 * Run with: npm run generate:types
 */
export interface TypeGeneratorOptions {
    bannerComment?: string;
    strictIndexSignatures?: boolean;
    enableConstEnums?: boolean;
    outputPath?: string;
}
export declare class TypeGenerator {
    private options;
    constructor(options?: TypeGeneratorOptions);
    /**
     * Generate TypeScript types from JSON Schema
     *
     * Note: Requires json-schema-to-typescript to be installed
     */
    generateFromSchema(schema: any, typeName: string): Promise<string>;
    /**
     * Generate types from schema file
     */
    generateFromFile(schemaPath: string, outputPath: string): Promise<void>;
    /**
     * Generate types for all definitions in a schema
     */
    generateAllDefinitions(schema: any, outputDir: string): Promise<void>;
}
/**
 * CLI usage example
 *
 * Usage:
 *   ts-node scripts/generate-types.ts
 */
export declare function generateTypes(): Promise<void>;
