import * as fs from 'fs';
import * as path from 'path';

/**
 * Transform Schema for Monaco Editor
 * 
 * Transforms the complete-schema.json FieldConfig from oneOf structure
 * to if/then/else structure for better Monaco editor support.
 * 
 * This allows type-specific IntelliSense and validation without oneOf confusion.
 */

const srcSchemaPath = path.join(__dirname, '../src/schemas/complete-schema.json');
const distSchemaPath = path.join(__dirname, '../dist/schemas/complete-schema.json');

interface SchemaProperty {
  type?: string;
  enum?: string[];
  description?: string;
  $ref?: string;
  oneOf?: any[];
  items?: any;
  properties?: Record<string, any>;
  additionalProperties?: boolean;
  required?: string[];
  [key: string]: any;
}

interface FieldConfigDefinition {
  type: string;
  description?: string;
  additionalProperties?: boolean;
  properties: Record<string, SchemaProperty>;
  required?: string[];
}

// Field config definitions to keep as separate definitions (used by other definitions)
const KEEP_SEPARATE_DEFINITIONS = ['TabFieldConfig', 'StepFieldConfig'];

// Common properties that exist in BaseFieldConfig
const BASE_FIELD_PROPERTIES = [
  'name', 'label', 'visible', 'disabled', 'width', 'height', 
  'minHeight', 'maxHeight', 'validationRules', 'visibleIf', 
  'disabledIf', 'readonlyIf', 'requiredIf', 'allowEditing', 
  'allowSorting', 'allowFiltering', 'colSpan', 'cssClass', 
  'helpText', 'readOnly'
];

/**
 * Extract type values from a FieldConfig definition
 */
function extractTypeValues(definition: FieldConfigDefinition): string[] {
  const typeProperty = definition.properties?.type;
  if (typeProperty?.enum) {
    return typeProperty.enum;
  }
  return [];
}

/**
 * Extract type-specific properties (not in base)
 */
function extractTypeSpecificProperties(
  definition: FieldConfigDefinition,
  basePropertyNames: string[]
): Record<string, SchemaProperty> {
  const specificProps: Record<string, SchemaProperty> = {};
  
  for (const [propName, propDef] of Object.entries(definition.properties || {})) {
    // Skip 'type' property and base properties
    if (propName === 'type' || basePropertyNames.includes(propName)) {
      continue;
    }
    specificProps[propName] = propDef;
  }
  
  return specificProps;
}

/**
 * Create if/then block for a type
 */
function createIfThenBlock(
  typeValues: string[],
  specificProperties: Record<string, SchemaProperty>
): any {
  // If there's only one type value, use const; otherwise use enum
  const typeCondition = typeValues.length === 1
    ? { const: typeValues[0] }
    : { enum: typeValues };

  return {
    if: {
      properties: {
        type: typeCondition
      },
      required: ['type']
    },
    then: {
      properties: specificProperties
    }
  };
}

/**
 * Transform the schema
 */
function transformSchema(): void {
  console.log('🔄 Transforming schema for Monaco editor...');
  
  // Read source schema
  const srcSchema = JSON.parse(fs.readFileSync(srcSchemaPath, 'utf-8'));
  const definitions = srcSchema.definitions;
  
  // Find all *FieldConfig definitions
  const fieldConfigDefs: Map<string, FieldConfigDefinition> = new Map();
  const fieldConfigRefNames: string[] = [];
  
  // Get the list of FieldConfig refs from the oneOf
  const fieldConfigOneOf = definitions.FieldConfig?.oneOf;
  if (!fieldConfigOneOf) {
    console.error('❌ FieldConfig.oneOf not found in schema');
    process.exit(1);
  }
  
  for (const ref of fieldConfigOneOf) {
    if (ref.$ref) {
      const defName = ref.$ref.replace('#/definitions/', '');
      fieldConfigRefNames.push(defName);
      if (definitions[defName]) {
        fieldConfigDefs.set(defName, definitions[defName]);
      }
    }
  }
  
  console.log(`📦 Found ${fieldConfigDefs.size} FieldConfig definitions`);
  
  // Collect all type values and if/then blocks
  const allTypeValues: string[] = [];
  const ifThenBlocks: any[] = [];
  const allProperties: Record<string, SchemaProperty> = {};
  
  // Get base properties from BaseFieldConfig
  const baseFieldConfig = definitions.BaseFieldConfig;
  if (baseFieldConfig?.properties) {
    for (const [propName, propDef] of Object.entries(baseFieldConfig.properties)) {
      allProperties[propName] = propDef as SchemaProperty;
    }
  }
  
  // Process each field config definition
  for (const [defName, definition] of fieldConfigDefs) {
    // Skip definitions that should be kept separate
    if (KEEP_SEPARATE_DEFINITIONS.includes(defName)) {
      console.log(`  ⏩ Keeping ${defName} as separate definition`);
      continue;
    }
    
    // Extract type values
    const typeValues = extractTypeValues(definition);
    if (typeValues.length > 0) {
      allTypeValues.push(...typeValues);
    }
    
    // Extract type-specific properties
    const specificProps = extractTypeSpecificProperties(definition, BASE_FIELD_PROPERTIES);
    
    // Create if/then block if there are type-specific properties
    // Type-specific properties are ONLY allowed when the type matches
    if (typeValues.length > 0 && Object.keys(specificProps).length > 0) {
      ifThenBlocks.push(createIfThenBlock(typeValues, specificProps));
    }
  }
  
  // Remove duplicates from type values
  const uniqueTypeValues = [...new Set(allTypeValues)];
  console.log(`📝 Collected ${uniqueTypeValues.length} unique type values`);
  console.log(`📝 Created ${ifThenBlocks.length} if/then blocks`);
  
  // Create the new FieldConfig definition
  // Only base properties in main definition - type-specific props only in if/then blocks
  // Using unevaluatedProperties (JSON Schema 2019-09) to respect if/then blocks
  const newFieldConfig: any = {
    type: 'object',
    description: 'Configuration for form fields. The available properties depend on the field type.',
    unevaluatedProperties: false,
    properties: {
      ...allProperties,  // Only BaseFieldConfig properties
      type: {
        type: 'string',
        enum: uniqueTypeValues.sort(),
        description: 'The type of field to render'
      }
    },
    required: ['type']
  };
  
  // Add allOf with if/then blocks for type-specific validation
  // Each if/then block adds allowed properties for that specific type
  if (ifThenBlocks.length > 0) {
    newFieldConfig.allOf = ifThenBlocks;
  }
  
  // Update the schema
  const transformedSchema = { ...srcSchema };
  transformedSchema.definitions = { ...definitions };
  
  // Replace FieldConfig with the new structure
  transformedSchema.definitions.FieldConfig = newFieldConfig;
  
  // Remove individual FieldConfig definitions (except those to keep)
  for (const defName of fieldConfigRefNames) {
    if (!KEEP_SEPARATE_DEFINITIONS.includes(defName)) {
      delete transformedSchema.definitions[defName];
    }
  }
  
  // Ensure dist/schemas directory exists
  const distDir = path.dirname(distSchemaPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Write the transformed schema
  fs.writeFileSync(distSchemaPath, JSON.stringify(transformedSchema, null, 2), 'utf-8');
  
  console.log(`✅ Transformed schema written to: ${distSchemaPath}`);
  console.log(`📊 Original definitions: ${Object.keys(definitions).length}`);
  console.log(`📊 Transformed definitions: ${Object.keys(transformedSchema.definitions).length}`);
  console.log(`📊 Removed ${Object.keys(definitions).length - Object.keys(transformedSchema.definitions).length} definitions`);
}

// Run the transformation
try {
  transformSchema();
} catch (error) {
  console.error('❌ Error transforming schema:', error);
  process.exit(1);
}

