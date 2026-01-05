/**
 * Documentation Generator
 *
 * Generates Markdown documentation from JSON Schema.
 * Useful for creating human-readable schema documentation.
 *
 * Note: This is a manual tool, not integrated into the build process.
 * Run with: npm run generate:docs
 */
export interface DocGeneratorOptions {
    includeExamples?: boolean;
    includeDefaults?: boolean;
    includeDeprecated?: boolean;
    outputFormat?: 'markdown' | 'html';
}
export declare class DocGenerator {
    private options;
    constructor(options?: DocGeneratorOptions);
    /**
     * Generate documentation from JSON Schema
     */
    generate(schema: any): string;
    /**
     * Generate documentation for a definition
     */
    private generateDefinitionDoc;
    /**
     * Generate documentation for properties
     */
    private generatePropertiesDoc;
    /**
     * Generate documentation from schema file
     */
    generateFromFile(schemaPath: string, outputPath: string): void;
    /**
     * Generate documentation for all definitions
     */
    generateDefinitionDocs(schema: any, outputDir: string): void;
}
/**
 * CLI usage example
 *
 * Usage:
 *   ts-node scripts/generate-docs.ts
 */
export declare function generateDocs(): Promise<void>;
//# sourceMappingURL=DocGenerator.d.ts.map