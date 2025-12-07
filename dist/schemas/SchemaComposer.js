"use strict";
/**
 * Schema Composer
 *
 * Composes modular schema files into a single complete schema.
 * Handles $ref resolution and circular dependency detection.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaComposer = void 0;
exports.composeSchemas = composeSchemas;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class SchemaComposer {
    constructor(schemasDir) {
        this.modules = new Map();
        this.schemasDir = schemasDir;
    }
    /**
     * Load all schema modules from directories
     */
    loadModules(directories) {
        for (const dir of directories) {
            const fullPath = path.join(this.schemasDir, dir);
            if (!fs.existsSync(fullPath)) {
                console.warn(`Directory not found: ${fullPath}`);
                continue;
            }
            const files = fs.readdirSync(fullPath).filter((f) => f.endsWith('.json'));
            for (const file of files) {
                const filePath = path.join(fullPath, file);
                const moduleId = `${dir}/${file.replace('.json', '')}`;
                try {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const schema = JSON.parse(content);
                    const module = {
                        id: moduleId,
                        path: filePath,
                        schema,
                        dependencies: this.extractDependencies(schema),
                    };
                    this.modules.set(moduleId, module);
                }
                catch (error) {
                    console.error(`Failed to load module ${moduleId}:`, error);
                }
            }
        }
        console.log(`Loaded ${this.modules.size} schema modules`);
    }
    /**
     * Compose all modules into a complete schema
     */
    compose(baseSchema) {
        const composed = { ...baseSchema };
        if (!composed.definitions) {
            composed.definitions = {};
        }
        // Add all module schemas as definitions
        for (const [id, module] of this.modules.entries()) {
            const defName = this.moduleIdToDefinitionName(id);
            composed.definitions[defName] = module.schema;
        }
        return composed;
    }
    /**
     * Check for circular dependencies
     */
    checkCircularDependencies() {
        const errors = [];
        const visited = new Set();
        const recursionStack = new Set();
        const visit = (moduleId, path = []) => {
            if (recursionStack.has(moduleId)) {
                errors.push(`Circular dependency detected: ${path.join(' -> ')} -> ${moduleId}`);
                return;
            }
            if (visited.has(moduleId)) {
                return;
            }
            visited.add(moduleId);
            recursionStack.add(moduleId);
            const module = this.modules.get(moduleId);
            if (module) {
                for (const dep of module.dependencies) {
                    visit(dep, [...path, moduleId]);
                }
            }
            recursionStack.delete(moduleId);
        };
        for (const moduleId of this.modules.keys()) {
            visit(moduleId);
        }
        return errors;
    }
    /**
     * Extract dependencies from schema $ref references
     */
    extractDependencies(schema) {
        const dependencies = new Set();
        const traverse = (obj) => {
            if (obj && typeof obj === 'object') {
                if (obj.$ref && typeof obj.$ref === 'string') {
                    // Extract module path from $ref
                    const match = obj.$ref.match(/\.\.\/([^#]+)/);
                    if (match) {
                        dependencies.add(match[1].replace('.schema.json', ''));
                    }
                }
                for (const value of Object.values(obj)) {
                    traverse(value);
                }
            }
        };
        traverse(schema);
        return Array.from(dependencies);
    }
    /**
     * Convert module ID to definition name
     */
    moduleIdToDefinitionName(moduleId) {
        // base/common -> CommonFieldProperties
        // fields/text -> TextFieldConfig
        return moduleId
            .split('/')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }
    /**
     * Get module dependency graph
     */
    getDependencyGraph() {
        const graph = new Map();
        for (const [id, module] of this.modules.entries()) {
            graph.set(id, module.dependencies);
        }
        return graph;
    }
    /**
     * Write composed schema to file
     */
    writeComposedSchema(outputPath, baseSchema) {
        const composed = this.compose(baseSchema);
        fs.writeFileSync(outputPath, JSON.stringify(composed, null, 2), 'utf-8');
        console.log(`Composed schema written to ${outputPath}`);
    }
}
exports.SchemaComposer = SchemaComposer;
/**
 * CLI usage example
 */
async function composeSchemas() {
    const schemasDir = path.join(__dirname, '../schemas');
    const composer = new SchemaComposer(schemasDir);
    // Load modular schemas
    composer.loadModules(['base', 'fields']);
    // Check for circular dependencies
    const errors = composer.checkCircularDependencies();
    if (errors.length > 0) {
        console.error('Circular dependencies detected:');
        errors.forEach((err) => console.error(`  ${err}`));
        process.exit(1);
    }
    // Load base schema
    const baseSchemaPath = path.join(schemasDir, 'complete-schema.json');
    const baseSchema = JSON.parse(fs.readFileSync(baseSchemaPath, 'utf-8'));
    // Compose and write
    const outputPath = path.join(schemasDir, 'complete-schema.composed.json');
    composer.writeComposedSchema(outputPath, baseSchema);
    console.log('✅ Schema composition completed');
}
