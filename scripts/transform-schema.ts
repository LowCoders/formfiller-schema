import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Path to TypeScript interfaces
const interfacesPath = path.join(__dirname, '../src/interfaces/index.ts');

/**
 * Extract ValidationRule type values from TypeScript interface
 * Parses the interface file to get the union type values
 */
function extractValidationRuleTypes(): string[] {
  const content = fs.readFileSync(interfacesPath, 'utf-8');
  
  // Find the ValidationRule interface and extract the type union
  // Match: interface ValidationRule { type: ... ; (until the semicolon)
  const typeMatch = content.match(/interface ValidationRule\s*\{[\s\S]*?type:\s*([\s\S]*?);/);
  if (!typeMatch) {
    console.warn('⚠️ Could not find ValidationRule.type in TypeScript interface');
    return [];
  }
  
  // Extract all string literals from the type union
  const typeUnion = typeMatch[1];
  const types = typeUnion.match(/'([^']+)'/g)?.map(t => t.replace(/'/g, '')) || [];
  
  return types;
}

/**
 * ErrorTarget property definition for ValidationRule
 */
const errorTargetProperty = {
  oneOf: [
    { enum: ['currentField', 'allTargetFields'] },
    { type: 'array', items: { type: 'string' } }
  ],
  description: 'Determines where validation errors should be displayed: currentField (default for field rules), allTargetFields (default for form rules), or specific field paths'
};

/**
 * Update ValidationRule schema with types from TypeScript and add errorTarget
 */
function updateValidationRuleSchema(schema: any, tsTypes: string[]): void {
  const validationRule = schema.definitions?.ValidationRule;
  if (!validationRule?.oneOf) {
    console.warn('⚠️ ValidationRule.oneOf not found in schema');
    return;
  }

  // Get existing types from schema
  const existingTypes = new Set<string>();
  for (const item of validationRule.oneOf) {
    const typeEnum = item.properties?.type?.enum;
    if (typeEnum && typeEnum.length > 0) {
      typeEnum.forEach((t: string) => existingTypes.add(t));
    }
  }

  // Find new crossField* types that need to be added
  const newCrossFieldTypes = tsTypes.filter(t => 
    t.startsWith('crossField') && 
    t !== 'crossField' && 
    !existingTypes.has(t)
  );

  console.log(`🔍 Existing validation types in schema: ${existingTypes.size}`);
  console.log(`🔍 TypeScript validation types: ${tsTypes.length}`);
  console.log(`➕ New crossField types to add: ${newCrossFieldTypes.length}`);

  // 1. Add errorTarget to all existing validation rules
  for (const item of validationRule.oneOf) {
    if (item.properties && !item.properties.errorTarget) {
      item.properties.errorTarget = errorTargetProperty;
    }
  }
  console.log(`✅ Added errorTarget to existing validation rules`);

  // 2. Add new crossField* types
  for (const cfType of newCrossFieldTypes) {
    const newRule = {
      type: 'object',
      description: `CrossField validation: ${cfType.replace('crossField', '')}`,
      additionalProperties: false,
      properties: {
        type: { enum: [cfType] },
        targetFields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of field names to validate together'
        },
        message: {
          type: 'string',
          description: 'Custom error message to display when validation fails'
        },
        errorTarget: errorTargetProperty,
        when: {
          $ref: '#/definitions/ConditionalExpression',
          description: 'Conditional expression that determines when this validation rule should be applied'
        }
      },
      required: ['type', 'targetFields']
    };
    validationRule.oneOf.push(newRule);
    console.log(`  ➕ Added ${cfType}`);
  }

  if (newCrossFieldTypes.length > 0) {
    console.log(`✅ Added ${newCrossFieldTypes.length} new crossField validation types`);
  }
}

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

// Common properties for all ValidationRule types
const COMMON_VALIDATION_PROPERTIES = ['type', 'message', 'when', 'errorTarget'];

/**
 * Transform ValidationRule from oneOf to if/then/else structure for better Monaco autocomplete
 */
function transformValidationRule(schema: any, tsTypes: string[]): void {
  const validationRule = schema.definitions?.ValidationRule;
  if (!validationRule?.oneOf) {
    console.warn('⚠️ ValidationRule.oneOf not found, skipping transformation');
    return;
  }

  console.log('🔄 Transforming ValidationRule for better autocomplete...');

  // Collect all types and type-specific properties
  const allTypes: string[] = [];
  const typeSpecificProps: Map<string, Record<string, any>> = new Map();
  const commonProps: Record<string, any> = {};

  // First pass: collect common properties and all types
  for (const item of validationRule.oneOf) {
    const typeEnum = item.properties?.type?.enum;
    if (typeEnum && typeEnum.length > 0) {
      const typeName = typeEnum[0];
      allTypes.push(typeName);

      // Collect type-specific properties (not common)
      const specificProps: Record<string, any> = {};
      for (const [propName, propDef] of Object.entries(item.properties || {})) {
        if (COMMON_VALIDATION_PROPERTIES.includes(propName)) {
          // Merge common properties (take the first definition)
          if (!commonProps[propName]) {
            commonProps[propName] = propDef;
          }
        } else {
          specificProps[propName] = propDef;
        }
      }
      
      if (Object.keys(specificProps).length > 0) {
        typeSpecificProps.set(typeName, specificProps);
      }
    }
  }

  // Add any TypeScript types not in schema
  for (const tsType of tsTypes) {
    if (!allTypes.includes(tsType)) {
      allTypes.push(tsType);
      // Add default crossField properties for new crossField* types
      if (tsType.startsWith('crossField')) {
        typeSpecificProps.set(tsType, {
          targetFields: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of field names to validate together'
          }
        });
      }
    }
  }

  console.log(`  📝 Collected ${allTypes.length} validation types`);
  console.log(`  📝 Found ${typeSpecificProps.size} types with specific properties`);

  // Build if/then blocks for type-specific properties
  const ifThenBlocks: any[] = [];
  for (const [typeName, props] of typeSpecificProps) {
    ifThenBlocks.push({
      if: {
        properties: {
          type: { const: typeName }
        },
        required: ['type']
      },
      then: {
        properties: props
      }
    });
  }

  // Create the new ValidationRule definition
  const newValidationRule: any = {
    type: 'object',
    description: 'Validation rule definitions for form fields. The available properties depend on the validation type.',
    properties: {
      type: {
        type: 'string',
        enum: allTypes.sort(),
        description: 'The type of validation to apply'
      },
      message: commonProps.message || {
        type: 'string',
        description: 'Custom error message to display when validation fails'
      },
      when: commonProps.when || {
        $ref: '#/definitions/ConditionalExpression',
        description: 'Conditional expression that determines when this validation rule should be applied'
      },
      errorTarget: errorTargetProperty
    },
    required: ['type']
  };

  // Add allOf with if/then blocks for type-specific properties
  if (ifThenBlocks.length > 0) {
    newValidationRule.allOf = ifThenBlocks;
  }

  // Replace the old ValidationRule with the new structure
  schema.definitions.ValidationRule = newValidationRule;

  console.log(`  ✅ Transformed ValidationRule: ${allTypes.length} types, ${ifThenBlocks.length} if/then blocks`);
}

/**
 * Transform the schema
 */
function transformSchema(): void {
  console.log('🔄 Transforming schema for Monaco editor...');
  
  // Read source schema
  const srcSchema = JSON.parse(fs.readFileSync(srcSchemaPath, 'utf-8'));
  const definitions = srcSchema.definitions;

  // === Step 1: Sync and Transform ValidationRule ===
  const validationTypes = extractValidationRuleTypes();
  if (validationTypes.length > 0) {
    console.log(`📝 Found ${validationTypes.length} validation types in TypeScript interface`);
    // Transform ValidationRule from oneOf to if/then/else for better autocomplete
    transformValidationRule(srcSchema, validationTypes);
  }
  
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

/**
 * Generate schema-data.js file that exports the schema as a JavaScript module
 * This allows the schema to be imported in both Node.js and browser environments
 */
function generateSchemaDataJs(): void {
  const schemaContent = fs.readFileSync(distSchemaPath, 'utf-8');
  
  const jsContent = `// Auto-generated file - do not edit manually
// Generated by scripts/transform-schema.ts
export const completeSchema = ${schemaContent};
`;

  const schemaDataPath = path.join(__dirname, '../dist/schemas/schema-data.js');
  fs.writeFileSync(schemaDataPath, jsContent, 'utf-8');
  console.log(`✅ Generated schema-data.js at: ${schemaDataPath}`);
}

// Run the transformation
try {
  transformSchema();
  generateSchemaDataJs();
} catch (error) {
  console.error('❌ Error transforming schema:', error);
  process.exit(1);
}

