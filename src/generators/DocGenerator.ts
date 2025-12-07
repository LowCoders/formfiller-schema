/**
 * Documentation Generator
 *
 * Generates Markdown documentation from JSON Schema.
 * Useful for creating human-readable schema documentation.
 *
 * Note: This is a manual tool, not integrated into the build process.
 * Run with: npm run generate:docs
 */

import * as fs from 'fs';
import * as path from 'path';

export interface DocGeneratorOptions {
  includeExamples?: boolean;
  includeDefaults?: boolean;
  includeDeprecated?: boolean;
  outputFormat?: 'markdown' | 'html';
}

export class DocGenerator {
  private options: DocGeneratorOptions;

  constructor(options: DocGeneratorOptions = {}) {
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
  generate(schema: any): string {
    let doc = '# Schema Documentation\n\n';

    if (schema.description) {
      doc += `${schema.description}\n\n`;
    }

    if (schema.definitions) {
      doc += '## Definitions\n\n';

      for (const [defName, defSchema] of Object.entries(schema.definitions)) {
        doc += this.generateDefinitionDoc(defName, defSchema as any);
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
  private generateDefinitionDoc(name: string, schema: any): string {
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
      doc += `**Allowed values:** ${schema.enum.map((v: any) => `\`${v}\``).join(', ')}\n\n`;
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
  private generatePropertiesDoc(properties: any, required: string[]): string {
    let doc = '';

    for (const [propName, propSchema] of Object.entries(properties)) {
      const prop = propSchema as any;
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
  generateFromFile(schemaPath: string, outputPath: string): void {
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
  generateDefinitionDocs(schema: any, outputDir: string): void {
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
      const doc = this.generateDefinitionDoc(defName, defSchema as any);
      const outputPath = path.join(outputDir, `${defName}.md`);
      fs.writeFileSync(outputPath, doc, 'utf-8');
    }

    console.log(
      `Generated documentation for ${Object.keys(schema.definitions).length} definitions`
    );
  }
}

/**
 * CLI usage example
 *
 * Usage:
 *   ts-node scripts/generate-docs.ts
 */
export async function generateDocs(): Promise<void> {
  const generator = new DocGenerator();

  const schemaPath = path.join(__dirname, '../schemas/complete-schema.json');
  const outputPath = path.join(__dirname, '../../docs/SCHEMA.md');

  try {
    generator.generateFromFile(schemaPath, outputPath);
    console.log('✅ Documentation generation completed');
  } catch (error) {
    console.error('❌ Documentation generation failed:', error);
    process.exit(1);
  }
}
