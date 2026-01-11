import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createGenerator, Config } from 'ts-json-schema-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * TypeScript → JSON Schema Generator
 * 
 * Generates JSON Schema from TypeScript interfaces using ts-json-schema-generator.
 * The output is a raw schema with oneOf structures that will be transformed
 * by transform-schema.ts into Monaco-optimized if/then/else structure.
 * 
 * Run with: npm run generate:schema
 */

const interfacesPath = path.join(__dirname, '../src/interfaces/index.ts');
const tsconfigPath = path.join(__dirname, '../tsconfig.json');
const outputPath = path.join(__dirname, '../dist/schemas/raw-schema.json');

/**
 * Configuration for ts-json-schema-generator
 */
const config: Config = {
  path: interfacesPath,
  tsconfig: tsconfigPath,
  type: '*', // Generate all exported types
  expose: 'export',
  topRef: true,
  jsDoc: 'extended', // Include JSDoc comments as descriptions
  additionalProperties: false,
  skipTypeCheck: true, // Skip type checking for faster generation
  extraTags: ['example', 'minimum', 'maximum', 'default', 'deprecated'],
};

/**
 * Post-process the generated schema
 * - Add $schema property
 * - Add title and description
 * - Clean up unnecessary definitions
 */
function postProcessSchema(schema: any): any {
  const processed = {
    $schema: 'https://json-schema.org/draft/2019-09/schema',
    title: 'FormFiller Complete Schema',
    description: 'Complete schema for FormFiller form definitions - Generated from TypeScript interfaces',
    ...schema,
  };

  // Ensure definitions exist
  if (!processed.definitions) {
    processed.definitions = {};
  }

  return processed;
}

/**
 * Main generation function
 */
function generateSchema(): void {
  console.log('🔄 Generating JSON Schema from TypeScript interfaces...');
  console.log(`📂 Source: ${interfacesPath}`);
  console.log(`📂 TSConfig: ${tsconfigPath}`);

  try {
    // Create the generator
    const generator = createGenerator(config);

    // Generate schema for all types
    console.log('📝 Generating schema for all exported types...');
    const rawSchema = generator.createSchema(config.type);

    // Post-process the schema
    const processedSchema = postProcessSchema(rawSchema);

    // Count definitions
    const definitionCount = Object.keys(processedSchema.definitions || {}).length;
    console.log(`📊 Generated ${definitionCount} type definitions`);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the schema
    fs.writeFileSync(outputPath, JSON.stringify(processedSchema, null, 2), 'utf-8');

    console.log(`✅ Raw schema written to: ${outputPath}`);
    console.log(`📊 Schema size: ${(JSON.stringify(processedSchema).length / 1024).toFixed(2)} KB`);

    // Log some key types for verification
    const keyTypes = ['FieldConfig', 'ValidationRule', 'ConditionalExpression', 'BaseFieldConfig'];
    const foundTypes = keyTypes.filter(t => processedSchema.definitions?.[t]);
    console.log(`🔍 Key types found: ${foundTypes.join(', ')}`);

    if (foundTypes.length < keyTypes.length) {
      const missingTypes = keyTypes.filter(t => !processedSchema.definitions?.[t]);
      console.warn(`⚠️ Missing types: ${missingTypes.join(', ')}`);
    }

  } catch (error) {
    console.error('❌ Error generating schema:', error);
    process.exit(1);
  }
}

// Run the generator
generateSchema();

