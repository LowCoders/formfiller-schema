import * as fs from 'fs';
import * as path from 'path';

/**
 * Monaco Editor Type Definitions Bundle Generator
 * 
 * Összegyűjti a formfiller-schema TypeScript definíciókat
 * és egy Monaco-kompatibilis bundle-t generál belőle.
 */

const distDir = path.join(__dirname, '../dist');
const outputFile = path.join(distDir, 'monaco-types.d.ts');

interface TypeFile {
  path: string;
  content: string;
}

/**
 * Rekurzívan bejárja a dist könyvtárat és összegyűjti a .d.ts fájlokat
 */
function collectTypeFiles(dir: string, baseDir: string = dir): TypeFile[] {
  const files: TypeFile[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Rekurzív bejárás (generators kihagyása, mert node-only)
      if (entry.name !== 'generators') {
        files.push(...collectTypeFiles(fullPath, baseDir));
      }
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      const relativePath = path.relative(baseDir, fullPath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      files.push({ path: relativePath, content });
    }
  }

  return files;
}

/**
 * Tisztítja a típusdefiníciókat Monaco számára
 * - Eltávolítja az export/import utasításokat
 * - Megtartja a declare kulcsszót
 */
function cleanTypeDefinition(content: string, filePath: string): string {
  let cleaned = content;

  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*?;?\s*$/gm, '');
  cleaned = cleaned.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  
  // Remove export statements but keep the declarations
  cleaned = cleaned.replace(/^export\s+/gm, '');
  
  // Add declare to top-level declarations if not already present
  cleaned = cleaned.replace(/^(interface|type|class|enum|const|function|namespace)\s+/gm, 'declare $1 ');
  
  // Fix double declare
  cleaned = cleaned.replace(/declare\s+declare\s+/g, 'declare ');
  
  // Remove empty lines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned;
}

/**
 * Generál egy Monaco-kompatibilis type definitions bundle-t
 */
function generateMonacoTypesBundle(): void {
  console.log('🔧 Monaco Types Bundle generálás...');
  
  // Ellenőrizzük, hogy a dist könyvtár létezik-e
  if (!fs.existsSync(distDir)) {
    console.error('❌ A dist könyvtár nem létezik. Futtasd először a build parancsot!');
    process.exit(1);
  }

  // Típusdefiníciók összegyűjtése
  const typeFiles = collectTypeFiles(distDir);
  console.log(`📦 ${typeFiles.length} típusdefiníció fájl található`);

  // Bundle tartalom összeállítása
  let bundleContent = `/**
 * FormFiller Schema - Monaco Editor Type Definitions Bundle
 * 
 * Auto-generated type definitions for Monaco Editor IntelliSense
 * Generated: ${new Date().toISOString()}
 */

declare module 'formfiller-schema' {
`;

  // Interfaces fájl tartalma (ez a legfontosabb)
  const interfacesFile = typeFiles.find(f => f.path === 'interfaces/index.d.ts' || f.path === 'interfaces\\index.d.ts');
  if (interfacesFile) {
    const cleaned = cleanTypeDefinition(interfacesFile.content, interfacesFile.path);
    bundleContent += '\n' + cleaned + '\n';
  } else {
    console.warn('⚠️  interfaces/index.d.ts nem található!');
  }

  // Core utilities (optional)
  const coreFiles = typeFiles.filter(f => f.path.startsWith('core/') || f.path.startsWith('core\\'));
  for (const file of coreFiles) {
    if (!file.path.includes('index.d.ts')) {
      const cleaned = cleanTypeDefinition(file.content, file.path);
      bundleContent += '\n' + cleaned + '\n';
    }
  }

  bundleContent += '\n}\n';

  // Fájl írása
  fs.writeFileSync(outputFile, bundleContent, 'utf-8');
  console.log(`✅ Monaco types bundle generálva: ${outputFile}`);
  console.log(`📊 Méret: ${(bundleContent.length / 1024).toFixed(2)} KB`);
}

// Script futtatása
try {
  generateMonacoTypesBundle();
} catch (error) {
  console.error('❌ Hiba történt a Monaco types bundle generálása közben:', error);
  process.exit(1);
}

