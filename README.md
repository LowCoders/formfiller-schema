# FormFiller Schema

Shared schema definitions for the FormFiller application. Provides TypeScript types and JSON Schema validation for frontend, backend, and embed packages.

## Main Components

- **FieldConfig**: Field configurations (text, number, date, dropdown, htmleditor, etc.)
- **ItemConfig**: View configurations (grid, tree, form)
- **ValidationRule**: DevExtreme-compatible validation rules
- **SchemaValidator**: Multi-level validation with caching

## Package Dependencies

This package is a core dependency for multiple FormFiller repositories:

```mermaid
flowchart TB
    subgraph schema [formfiller-schema]
        INTS["src/interfaces/index.ts<br/>TypeScript interfaces"]
        CSCHEMA["dist/schemas/complete-schema.json<br/>JSON Schema"]
    end
    
    subgraph libs [Library Packages]
        VAL[formfiller-validator]
        EMBED[formfiller-embed]
    end
    
    subgraph apps [Application Packages]
        BE[formfiller-backend]
        FE[formfiller-frontend]
    end
    
    INTS --> VAL
    INTS --> EMBED
    INTS --> BE
    INTS --> FE
    
    VAL --> EMBED
    VAL --> BE
    VAL --> FE
    
    CSCHEMA --> BE
    CSCHEMA --> FE
```

**Build order for libraries:**

```
formfiller-types → formfiller-schema → formfiller-validator → formfiller-embed
```

## Usage by Repository

| Repository | TypeScript Interfaces Used | complete-schema.json Usage |
|------------|---------------------------|---------------------------|
| **formfiller-frontend** | `FieldConfig`, `ViewConfig`, `ValidationRule`, `FieldType`, `LookupConfig` | Monaco editor IntelliSense in `ConfigJSONEditor.tsx` |
| **formfiller-backend** | `ItemConfig`, `FormPreferences`, `FieldConfig`, `ValidationRule` | AJV runtime validation in `configValidator.ts` |
| **formfiller-embed** | `ViewConfig`, `FieldConfig`, `FormPreferences`, `ValidationRuleOrGroup` | Not used directly |
| **formfiller-validator** | `ValidationRule`, `FieldConfig`, `ConditionalExpression`, `ComputedRule`, `CrossFieldType` | Not used directly |

### Import Examples

**Frontend (Monaco IntelliSense):**

```typescript
// TypeScript types
import { FieldConfig, ViewConfig } from 'formfiller-schema';

// JSON Schema for Monaco editor
import completeSchemaRaw from 'formfiller-schema/dist/schemas/complete-schema.json';
```

**Backend (AJV Validation):**

```typescript
// TypeScript types
import { ItemConfig, FieldConfig } from 'formfiller-schema';

// Schema for AJV validation
import { schemas } from 'formfiller-schema';
const { completeSchema } = schemas;
```

**Validator/Embed (Types only):**

```typescript
import { ValidationRule, ConditionalExpression } from 'formfiller-schema';
```

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

```mermaid
flowchart TD
    subgraph source [Source - Single Source of Truth]
        TS[src/interfaces/index.ts]
    end

    subgraph build [npm run build]
        TSC[tsc compile]
        GEN[generate:schema]
        TRANS[transform:schema]
        MONACO[generate:monaco]
    end

    subgraph output [Output]
        DTS[dist/*.d.ts]
        RAW[dist/schemas/raw-schema.json]
        COMPLETE[dist/schemas/complete-schema.json]
        MTYPES[dist/monaco-types.d.ts]
    end

    TS --> TSC
    TS --> GEN
    
    TSC --> DTS
    DTS --> MONACO
    
    GEN --> RAW
    RAW --> TRANS
    TRANS --> COMPLETE
    
    MONACO --> MTYPES
```

The `npm run build` command executes:

1. **TypeScript compilation** - Compiles `src/` to `dist/`
2. **generate:schema** - Generates JSON Schema from TypeScript interfaces using `ts-json-schema-generator`
3. **transform:schema** - Transforms FieldConfig from `anyOf` to `if/then/allOf` for Monaco IntelliSense
4. **generate:monaco** - Bundles TypeScript definitions for Monaco editor

## Scripts

| Script | Description |
|--------|-------------|
| `build` | Full build pipeline (tsc + schema generation + transform + monaco types) |
| `generate:schema` | Generates JSON Schema from TypeScript interfaces |
| `transform:schema` | Transforms `anyOf` to `if/then/allOf` structure for Monaco |
| `generate:monaco` | Bundles `.d.ts` files into `monaco-types.d.ts` |
| `build:legacy` | Legacy build using manual schema (fallback) |
| `test` | Run Jest tests |

### generate-schema.ts

Generates JSON Schema from TypeScript interfaces using `ts-json-schema-generator`:

- Reads `src/interfaces/index.ts`
- Outputs `dist/schemas/raw-schema.json`
- Preserves JSDoc comments as descriptions
- Creates `anyOf` structures for union types

### transform-schema.ts

Transforms the generated JSON Schema for better Monaco editor IntelliSense:

```mermaid
flowchart LR
    subgraph input [Input: anyOf structure]
        A[FieldConfig]
        A --> B[anyOf]
        B --> C[TextFieldConfig]
        B --> D[NumberFieldConfig]
        B --> E[HtmlEditorFieldConfig]
    end
    
    subgraph output [Output: if/then structure]
        F[FieldConfig]
        F --> G[properties: base props]
        F --> H[allOf]
        H --> I["if type=text then ..."]
        H --> J["if type=number then ..."]
        H --> K["if type=htmleditor then ..."]
    end
    
    input --> |transform| output
```

**Input (anyOf structure from generator):**

```json
{
  "FieldConfig": {
    "anyOf": [
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
    "properties": { /* base properties from BaseFieldConfig */ },
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

```mermaid
flowchart LR
    subgraph schema_pkg [formfiller-schema]
        SCHEMA[complete-schema.json]
    end
    
    subgraph frontend [formfiller-frontend]
        EDITOR[ConfigJSONEditor.tsx]
        MONACO[Monaco Editor]
    end
    
    subgraph features [Features]
        F1[Type-specific IntelliSense]
        F2[Enum autocomplete]
        F3[Validation errors]
    end
    
    SCHEMA --> |import| EDITOR
    EDITOR --> MONACO
    MONACO --> F1
    MONACO --> F2
    MONACO --> F3
```

The frontend `ConfigJSONEditor.tsx` imports the transformed schema:

```typescript
import completeSchemaRaw from 'formfiller-schema/dist/schemas/complete-schema.json';
```

Key features:
- Type-specific IntelliSense via `if/then` blocks
- Enum values for autocomplete (e.g., toolbar item names: `bold`, `italic`, `header`, etc.)
- Validation errors shown in editor

## Modifying the Schema

The TypeScript interfaces in `src/interfaces/index.ts` are the **Single Source of Truth**. The JSON Schema is automatically generated from them.

1. **Edit TypeScript types**: `src/interfaces/index.ts`
2. **Build**: `npm run build`
3. **Test in Monaco**: Restart frontend dev server and verify IntelliSense

### Adding a new field type

```mermaid
flowchart LR
    A[1. Add to FieldType enum] --> B[2. Create NewFieldConfig interface]
    B --> C["3. Add type: 'yourtype' literal"]
    C --> D[4. Add to FieldConfig union]
    D --> E[5. npm run build]
    E --> F[JSON Schema auto-generated!]
```

1. Add the type to `FieldType` enum in `src/interfaces/index.ts`
2. Create `NewFieldConfig` interface extending `BaseFieldConfig`
3. Add `type: 'yourtype'` literal property to the interface
4. Add to `FieldConfig` union type
5. Build and test - JSON Schema is auto-generated!

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

## Development Workflow

### Schema Modification Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Schema as formfiller-schema
    participant Validator as formfiller-validator
    participant Embed as formfiller-embed
    participant Apps as backend/frontend
    
    Dev->>Schema: 1. Edit src/interfaces/index.ts
    Dev->>Schema: 2. npm run build
    Note over Schema: tsc + generate:schema + transform:schema
    
    Dev->>Schema: 3. git commit && git push
    
    alt Local Development - Workspace
        Dev->>Validator: 4a. npm run build:validator
        Dev->>Embed: 4b. npm run build:embed
        Note over Apps: Changes visible via symlinks
    else Production - GitHub
        Dev->>Apps: 4. npm update formfiller-schema
        Dev->>Apps: 5. Restart servers
    end
```

### Local Development (Recommended)

Using [formfiller-dev-setup](https://github.com/LowCoders/formfiller-dev-setup) workspace:

```bash
# 1. Edit the schema
cd /var/www/formfiller-schema
# ... make changes to src/interfaces/index.ts ...

# 2. Build schema
npm run build

# 3. Rebuild dependent libraries
cd /var/www
npm run build:libs   # Builds: types → schema → validator → embed

# 4. Test in apps
# Frontend: refresh browser (Vite hot-reloads)
# Backend: restart if running
```

### Production Deployment

For production environments where packages are installed from GitHub:

**Option A: Using sync-dependents.sh (automated)**

```bash
cd /var/www/formfiller-schema

# Build, commit, push, and update all dependent projects
./sync-dependents.sh

# With options:
DRY_RUN=true ./sync-dependents.sh      # Preview only
AUTO_RESTART=true ./sync-dependents.sh  # Restart backend automatically
SKIP_PUSH=true ./sync-dependents.sh     # Skip git push (local testing)
```

**Option B: Manual update**

```bash
# 1. Build and push schema
cd /var/www/formfiller-schema
npm run build
git add -A && git commit -m "chore: update schema"
git push

# 2. Update dependent projects
cd /var/www/formfiller-backend
npm update formfiller-schema formfiller-validator
npm run build

cd /var/www/formfiller-frontend
npm update formfiller-schema formfiller-validator

# 3. Restart servers
```

### sync-dependents.sh Script

The `sync-dependents.sh` script automates the schema update process for GitHub-based deployments:

| Step | Action |
|------|--------|
| 1 | Build formfiller-schema (`npm run build`) |
| 2 | Commit and push changes to GitHub |
| 3 | Update backend (`npm update formfiller-schema formfiller-validator formfiller-types`) |
| 4 | Rebuild backend |
| 5 | Update frontend packages |
| 6 | Verify installation |

**Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `DRY_RUN` | `false` | Preview mode - no actual changes |
| `AUTO_RESTART` | `false` | Automatically restart backend server |
| `SKIP_PUSH` | `false` | Skip git push (for local testing) |

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
