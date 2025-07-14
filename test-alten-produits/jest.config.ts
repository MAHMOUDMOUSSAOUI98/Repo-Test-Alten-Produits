import type { Config } from 'jest';

const config: Config = {
  // Préréglage Jest pour les projets TypeScript, intégrant ts-jest
  preset: 'ts-jest',

  // Environnement de test pour les tests DOM (nécessaire pour React Testing Library)
  testEnvironment: 'jest-environment-jsdom',

  // Fichiers à ignorer par le test runner
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/" // Ignorer le dossier de build de Vite
  ],

  // Transforme les fichiers TypeScript et JavaScript pour Jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforme les fichiers .ts/.tsx avec ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest', // Si vous avez des fichiers JS/JSX non-TS, utilisez babel-jest
  },

  // Modèles de fichiers de test à inclure
  testMatch: [
    '**/__tests__/**/*.{ts,tsx,js,jsx}',
    '**/?(*.)+(spec|test).ts?(x)',
  ],

  // Configuration des modules (utile pour les imports absolus, si vous en utilisez)
  moduleNameMapper: {
    // Si vous utilisez des alias dans vite.config.ts (ex: @/components), ajoutez-les ici
    // '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Fichiers de configuration à exécuter avant chaque test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Extension de fichier à importer
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Ignorer les transformations pour node_modules (améliore les performances)
  transformIgnorePatterns: [
    '/node_modules/(?!(.*@mui.*)|(.*@emotion.*))', // Transpile MUI et Emotion même depuis node_modules
  ],
};

export default config