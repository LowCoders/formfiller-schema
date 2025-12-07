"use strict";
/**
 * TypeScript Type Generator
 *
 * Conceptual implementation for generating TypeScript types from JSON Schema.
 * Uses json-schema-to-typescript library for type generation.
 *
 * Note: This is a manual tool, not integrated into the build process.
 * Run with: npm run generate:types
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
exports.TypeGenerator = void 0;
exports.generateTypes = generateTypes;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class TypeGenerator {
    constructor(options = {}) {
        this.options = {
            bannerComment: '/* Generated from JSON Schema - DO NOT EDIT MANUALLY */',
            strictIndexSignatures: true,
            enableConstEnums: true,
            ...options,
        };
    }
    /**
     * Generate TypeScript types from JSON Schema
     *
     * Note: Requires json-schema-to-typescript to be installed
     */
    async generateFromSchema(schema, typeName) {
        // This is a conceptual implementation
        // In actual use, import and use json-schema-to-typescript
        console.log('TypeGenerator: Generating types for', typeName);
        console.log('Note: This is a conceptual implementation');
        console.log('To use: npm install json-schema-to-typescript');
        console.log('Then import { compile } from "json-schema-to-typescript"');
        return `// TypeScript types would be generated here\n// Schema: ${typeName}`;
    }
    /**
     * Generate types from schema file
     */
    async generateFromFile(schemaPath, outputPath) {
        console.log(`Generating types from ${schemaPath} to ${outputPath}`);
        // Read schema file
        const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
        const schema = JSON.parse(schemaContent);
        // Generate types (conceptual)
        const types = await this.generateFromSchema(schema, 'GeneratedTypes');
        // Write to output file
        fs.writeFileSync(outputPath, types, 'utf-8');
        console.log('Types generated successfully');
    }
    /**
     * Generate types for all definitions in a schema
     */
    async generateAllDefinitions(schema, outputDir) {
        if (!schema.definitions) {
            console.warn('No definitions found in schema');
            return;
        }
        for (const [defName, defSchema] of Object.entries(schema.definitions)) {
            console.log(`Generating types for definition: ${defName}`);
            const types = await this.generateFromSchema(defSchema, defName);
            const outputPath = path.join(outputDir, `${defName}.d.ts`);
            fs.writeFileSync(outputPath, types, 'utf-8');
        }
        console.log(`Generated types for ${Object.keys(schema.definitions).length} definitions`);
    }
}
exports.TypeGenerator = TypeGenerator;
/**
 * CLI usage example
 *
 * Usage:
 *   ts-node scripts/generate-types.ts
 */
async function generateTypes() {
    const generator = new TypeGenerator();
    const schemaPath = path.join(__dirname, '../schemas/complete-schema.json');
    const outputPath = path.join(__dirname, '../generated/types.ts');
    try {
        await generator.generateFromFile(schemaPath, outputPath);
        console.log('✅ Type generation completed');
    }
    catch (error) {
        console.error('❌ Type generation failed:', error);
        process.exit(1);
    }
}
