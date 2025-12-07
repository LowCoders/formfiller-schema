"use strict";
/**
 * Documentation Generator
 *
 * Generates Markdown documentation from JSON Schema.
 * Useful for creating human-readable schema documentation.
 *
 * Note: This is a manual tool, not integrated into the build process.
 * Run with: npm run generate:docs
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
exports.DocGenerator = void 0;
exports.generateDocs = generateDocs;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class DocGenerator {
    constructor(options = {}) {
        this.options = {
            includeExamples: true,
            includeDefaults: true,
            includeDeprecated: true,
            outputFormat: 'markdown',
            ...options,
        };
    }
    /**
     * Generate documentation from JSON Schema
     */
    generate(schema) {
        let doc = '# Schema Documentation\n\n';
        if (schema.description) {
            doc += `${schema.description}\n\n`;
        }
        if (schema.definitions) {
            doc += '## Definitions\n\n';
            for (const [defName, defSchema] of Object.entries(schema.definitions)) {
                doc += this.generateDefinitionDoc(defName, defSchema);
            }
        }
        if (schema.properties) {
            doc += '## Properties\n\n';
            doc += this.generatePropertiesDoc(schema.properties, schema.required || []);
        }
        return doc;
    }
    /**
     * Generate documentation for a definition
     */
    generateDefinitionDoc(name, schema) {
        let doc = `### ${name}\n\n`;
        if (schema.description) {
            doc += `${schema.description}\n\n`;
        }
        if (schema.type) {
            doc += `**Type:** \`${schema.type}\`\n\n`;
        }
        if (schema.properties) {
            doc += '**Properties:**\n\n';
            doc += this.generatePropertiesDoc(schema.properties, schema.required || []);
        }
        if (schema.enum) {
            doc += `**Allowed values:** ${schema.enum.map((v) => `\`${v}\``).join(', ')}\n\n`;
        }
        if (this.options.includeExamples && schema.examples) {
            doc += '**Examples:**\n\n';
            for (const example of schema.examples) {
                doc += '```json\n';
                doc += JSON.stringify(example, null, 2);
                doc += '\n```\n\n';
            }
        }
        return doc;
    }
    /**
     * Generate documentation for properties
     */
    generatePropertiesDoc(properties, required) {
        let doc = '';
        for (const [propName, propSchema] of Object.entries(properties)) {
            const prop = propSchema;
            const isRequired = required.includes(propName);
            doc += `- **${propName}**${isRequired ? ' (required)' : ''}`;
            if (prop.type) {
                doc += ` - Type: \`${prop.type}\``;
            }
            if (prop.description) {
                doc += `\n  ${prop.description}`;
            }
            if (this.options.includeDefaults && prop.default !== undefined) {
                doc += `\n  Default: \`${JSON.stringify(prop.default)}\``;
            }
            if (prop.deprecated && this.options.includeDeprecated) {
                doc += '\n  ⚠️ **Deprecated**';
            }
            doc += '\n\n';
        }
        return doc;
    }
    /**
     * Generate documentation from schema file
     */
    generateFromFile(schemaPath, outputPath) {
        console.log(`Generating documentation from ${schemaPath}`);
        const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
        const schema = JSON.parse(schemaContent);
        const doc = this.generate(schema);
        fs.writeFileSync(outputPath, doc, 'utf-8');
        console.log(`Documentation written to ${outputPath}`);
    }
    /**
     * Generate documentation for all definitions
     */
    generateDefinitionDocs(schema, outputDir) {
        if (!schema.definitions) {
            console.warn('No definitions found in schema');
            return;
        }
        // Create output directory if not exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        // Generate index file
        let index = '# Schema Definitions\n\n';
        index += 'Generated documentation for all schema definitions.\n\n';
        index += '## Definitions\n\n';
        for (const defName of Object.keys(schema.definitions)) {
            index += `- [${defName}](./${defName}.md)\n`;
        }
        fs.writeFileSync(path.join(outputDir, 'INDEX.md'), index, 'utf-8');
        // Generate individual definition files
        for (const [defName, defSchema] of Object.entries(schema.definitions)) {
            const doc = this.generateDefinitionDoc(defName, defSchema);
            const outputPath = path.join(outputDir, `${defName}.md`);
            fs.writeFileSync(outputPath, doc, 'utf-8');
        }
        console.log(`Generated documentation for ${Object.keys(schema.definitions).length} definitions`);
    }
}
exports.DocGenerator = DocGenerator;
/**
 * CLI usage example
 *
 * Usage:
 *   ts-node scripts/generate-docs.ts
 */
async function generateDocs() {
    const generator = new DocGenerator();
    const schemaPath = path.join(__dirname, '../schemas/complete-schema.json');
    const outputPath = path.join(__dirname, '../../docs/SCHEMA.md');
    try {
        generator.generateFromFile(schemaPath, outputPath);
        console.log('✅ Documentation generation completed');
    }
    catch (error) {
        console.error('❌ Documentation generation failed:', error);
        process.exit(1);
    }
}
