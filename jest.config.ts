import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    // Keep the module settings of tsconfig.json: ts-jest otherwise downgrades `module`,
    // which makes the import attribute on complete-schema.json a compile error and takes
    // every suite that imports the schema with it.
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
        },
      },
    ],
  },
  // ESM module mapping - strip .js from imports
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // src/schemas/complete-schema.json is only a placeholder with empty definitions; the
    // real schema is generated into dist by the build. Matches './complete-schema.json' too.
    'complete-schema\\.json$': '<rootDir>/dist/schemas/complete-schema.json',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  verbose: true,
  testTimeout: 10000,
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › ',
      usePathForSuiteName: 'true'
    }]
  ]
};

export default config;

