# FormFiller Schema

Közös séma definíciók a FormFiller alkalmazáshoz. TypeScript típusok és JSON Schema validáció a frontend és backend számára.

## Telepítés

```bash
npm install formfiller-schema
```

## Gyors Használat

```typescript
import { FieldConfig, ItemConfig, validateField } from 'formfiller-schema';

// TypeScript típusok használata
const myField: FieldConfig = {
  name: 'firstName',
  title: 'Keresztnév',
  type: 'text',
  validationRules: [{ type: 'required', message: 'Kötelező mező' }]
};

// Validáció
const result = validateField(myField);
if (!result.valid) {
  console.error('Validációs hibák:', result.errors);
}
```

## Fejlesztés

```bash
# Build
npm run build

# Disztribúció a többi projektbe
npm run distribute
```

## Fő Komponensek

- **FieldConfig**: Mező konfigurációk (text, number, date, lookup stb.)
- **ItemConfig**: Nézet konfigurációk (grid, tree, form)
- **ValidationRule**: DevExtreme-kompatibilis validációs szabályok
- **SchemaValidator**: Többszintű validáció
- **SchemaCache**: Gyorsítótárazott validátorok

## Részletes Dokumentáció

A teljes API dokumentáció: [formfiller-docs](../formfiller-docs)

## Licenc

ISC
