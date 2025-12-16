# FormFiller Schema

Shared schema definitions for the FormFiller application. Provides TypeScript types and JSON Schema validation for frontend, backend, and embed packages.

## Main Components

- **FieldConfig**: Field configurations (text, number, date, dropdown, htmleditor, etc.)
- **ItemConfig**: View configurations (grid, tree, form)
- **ValidationRule**: DevExtreme-compatible validation rules
- **SchemaValidator**: Multi-level validation with caching

## Installation

### Production (GitHub)

```bash
npm install github:LowCoders/formfiller-schema
```

### Development (Workspace)

For local development, use [formfiller-dev-setup](https://github.com/LowCoders/formfiller-dev-setup) which symlinks all packages together:

```bash
cd /var/www/formfiller-dev-setup
./deploy.sh
cd /var/www
npm install
npm run build:libs
```

## Build Pipeline

```
src/schemas/complete-schema.json     src/interfaces/index.ts
              │                               │
              ▼                               ▼
      ┌───────────────────────────────────────────┐
      │              npm run build                │
      └───────────────────────────────────────────┘
              │                               │
              ▼                               ▼
    copy to dist/schemas/              tsc compile
              │                               │
              ▼                               ▼
    transform-schema.ts              dist/*.d.ts files
              │                               │
              ▼                               ▼
dist/schemas/complete-schema.json   generate-monaco-types.ts
    (if/then structure)                       │
                                              ▼
                                   dist/monaco-types.d.ts
```

The `npm run build` command executes:

1. **TypeScript compilation** - Compiles `src/` to `dist/`
2. **Schema copy** - Copies `src/schemas/*.json` to `dist/schemas/`
3. **transform:schema** - Transforms FieldConfig from `oneOf` to `if/then/allOf` for Monaco IntelliSense
4. **generate:monaco** - Bundles TypeScript definitions for Monaco editor

## Scripts

| Script | Description |
|--------|-------------|
| `build` | Full build pipeline (tsc + schema transform + monaco types) |
| `transform:schema` | Transforms `oneOf` to `if/then/allOf` structure for Monaco |
| `generate:monaco` | Bundles `.d.ts` files into `monaco-types.d.ts` |
| `test` | Run Jest tests |
| `distribute` | Update schema in dependent projects (legacy) |

### transform-schema.ts

Transforms the JSON Schema for better Monaco editor IntelliSense:

**Input (oneOf structure):**
```json
{
  "FieldConfig": {
    "oneOf": [
      { "$ref": "#/definitions/TextFieldConfig" },
      { "$ref": "#/definitions/HtmlEditorFieldConfig" }
    ]
  }
}
```

**Output (if/then/allOf structure):**
```json
{
  "FieldConfig": {
    "properties": { /* base properties */ },
    "allOf": [
      {
        "if": { "properties": { "type": { "const": "htmleditor" } } },
        "then": { "properties": { "toolbar": {...}, "mediaResizing": {...} } }
      }
    ]
  }
}
```

This allows Monaco to show type-specific properties based on the `type` field value.

### generate-monaco-types.ts

Collects all TypeScript definition files from `dist/` and bundles them into a single `monaco-types.d.ts` file for Monaco editor TypeScript IntelliSense.

## Monaco Integration

The frontend `ConfigJSONEditor.tsx` imports the transformed schema:

```typescript
import completeSchemaRaw from 'formfiller-schema/dist/schemas/complete-schema.json';
```

Key features:
- Type-specific IntelliSense via `if/then` blocks
- Enum values for autocomplete (e.g., toolbar item names: `bold`, `italic`, `header`, etc.)
- Validation errors shown in editor

## Modifying the Schema

1. **Edit JSON Schema**: `src/schemas/complete-schema.json`
2. **Update TypeScript types**: `src/interfaces/index.ts`
3. **Build**: `npm run build` (or `npm run build:schema` from workspace root)
4. **Test in Monaco**: Restart frontend dev server and verify IntelliSense

### Adding a new field type

1. Add the type to `FieldType` enum in `src/interfaces/index.ts`
2. Create `NewFieldConfig` interface extending `BaseFieldConfig`
3. Add to `FieldConfig` union type
4. Add JSON Schema definition in `src/schemas/complete-schema.json`
5. Build and test

### Adding properties with enum values

For Monaco autocomplete to work with enum values:

```json
{
  "propertyName": {
    "type": "string",
    "enum": ["value1", "value2", "value3"],
    "description": "Description for IntelliSense"
  }
}
```

## Quick Start

```typescript
import { FieldConfig, ItemConfig } from 'formfiller-schema';

const myField: FieldConfig = {
  name: 'description',
  label: 'Description',
  type: 'htmleditor',
  toolbar: {
    items: ['bold', 'italic', 'header', 'separator', 'orderedList', 'bulletList']
  }
};
```

## Detailed Documentation

Full documentation: [formfiller-docs](https://lowcoders.github.io/formfiller-docs/)

## License

MIT
