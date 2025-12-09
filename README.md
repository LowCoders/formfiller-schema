# FormFiller Schema

Shared schema definitions for the FormFiller application. TypeScript types and JSON Schema validation for frontend and backend.

## Installation

```bash
npm install formfiller-schema
```

## Quick Start

```typescript
import { FieldConfig, ItemConfig, validateField } from 'formfiller-schema';

// Using TypeScript types
const myField: FieldConfig = {
  name: 'firstName',
  title: 'First Name',
  type: 'text',
  validationRules: [{ type: 'required', message: 'Required field' }]
};

// Validation
const result = validateField(myField);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

## Development

```bash
# Build
npm run build

# Distribute to other projects
npm run distribute
```

## Main Components

- **FieldConfig**: Field configurations (text, number, date, lookup, etc.)
- **ItemConfig**: View configurations (grid, tree, form)
- **ValidationRule**: DevExtreme-compatible validation rules
- **SchemaValidator**: Multi-level validation
- **SchemaCache**: Cached validators

## Detailed Documentation

Full documentation: [formfiller-docs](https://lowcoders.github.io/formfiller-docs/)

## License

ISC
