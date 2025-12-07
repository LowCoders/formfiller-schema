/**
 * Schema Composer
 *
 * Composes modular schema files into a single complete schema.
 * Handles $ref resolution and circular dependency detection.
 */
export interface SchemaModule {
    id: string;
    path: string;
    schema: any;
    dependencies: string[];
}
export declare class SchemaComposer {
    private modules;
    private schemasDir;
    constructor(schemasDir: string);
    /**
     * Load all schema modules from directories
     */
    loadModules(directories: string[]): void;
    /**
     * Compose all modules into a complete schema
     */
    compose(baseSchema: any): any;
    /**
     * Check for circular dependencies
     */
    checkCircularDependencies(): string[];
    /**
     * Extract dependencies from schema $ref references
     */
    private extractDependencies;
    /**
     * Convert module ID to definition name
     */
    private moduleIdToDefinitionName;
    /**
     * Get module dependency graph
     */
    getDependencyGraph(): Map<string, string[]>;
    /**
     * Write composed schema to file
     */
    writeComposedSchema(outputPath: string, baseSchema: any): void;
}
/**
 * CLI usage example
 */
export declare function composeSchemas(): Promise<void>;
