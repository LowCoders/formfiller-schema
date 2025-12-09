import * as fs from 'fs';
import * as path from 'path';

/**
 * Monaco Editor Type Definitions Bundle Generator
 * 
 * Collects formfiller-schema TypeScript definitions
 * and generates a Monaco-compatible bundle from them.
 */

const distDir = path.join(__dirname, '../dist');
const outputFile = path.join(distDir, 'monaco-types.d.ts');

interface TypeFile {
  path: string;
  content: string;
}

/**
 * Recursively traverses the dist directory and collects .d.ts files
 */
function collectTypeFiles(dir: string, baseDir: string = dir): TypeFile[] {
  const files: TypeFile[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursive traversal (skip generators as they are node-only)
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
 * Cleans type definitions for Monaco
 * - Removes export/import statements
 * - Keeps the declare keyword
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
 * Generates a Monaco-compatible type definitions bundle
 */
function generateMonacoTypesBundle(): void {
  console.log('🔧 Generating Monaco Types Bundle...');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ The dist directory does not exist. Run the build command first!');
    process.exit(1);
  }

  // Collect type definitions
  const typeFiles = collectTypeFiles(distDir);
  console.log(`📦 Found ${typeFiles.length} type definition files`);

  // Build bundle content
  let bundleContent = `/**
 * FormFiller Schema - Monaco Editor Type Definitions Bundle
 * 
 * Auto-generated type definitions for Monaco Editor IntelliSense
 * Generated: ${new Date().toISOString()}
 */

declare module 'formfiller-schema' {
`;

  // Interfaces file content (this is the most important)
  const interfacesFile = typeFiles.find(f => f.path === 'interfaces/index.d.ts' || f.path === 'interfaces\\index.d.ts');
  if (interfacesFile) {
    const cleaned = cleanTypeDefinition(interfacesFile.content, interfacesFile.path);
    bundleContent += '\n' + cleaned + '\n';
  } else {
    console.warn('⚠️  interfaces/index.d.ts not found!');
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

  // Write file
  fs.writeFileSync(outputFile, bundleContent, 'utf-8');
  console.log(`✅ Monaco types bundle generated: ${outputFile}`);
  console.log(`📊 Size: ${(bundleContent.length / 1024).toFixed(2)} KB`);
}

// Run script
try {
  generateMonacoTypesBundle();
} catch (error) {
  console.error('❌ Error occurred while generating Monaco types bundle:', error);
  process.exit(1);
}
