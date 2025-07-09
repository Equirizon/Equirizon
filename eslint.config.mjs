// eslint.config.js or .ts
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import eslintPluginAstro from 'eslint-plugin-astro'
import stylisticJs from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import globals from 'globals'

/* 
-- dependencies installed --

eslint
eslint-plugin-astro2
eslint-plugin-react
typescript-eslint
@eslint/js
@stylistic/eslint-plugin
@typescript-eslint/eslint-plugin
@typescript-eslint/parser
globals

*/

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/.astro/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/*.config.cjs',
    ],
  },
  // General Config + React
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // Code styling
      semi: ['warn', 'never'],
      eqeqeq: ['error', 'smart'],
      '@stylistic/js/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/js/comma-spacing': ['warn', { before: false, after: true }],
      '@stylistic/js/indent': ['warn', 2],
      // Console usage
      'no-console': ['error', { allow: ['info', 'warn', 'error', 'assert', 'table'] }],

      // React-specific
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // modern React doesn't need import React
      'react/prop-types': 'off', // you're probably using TypeScript
    },
  },

  // typescript
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,astro}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // typing rules, adjust based on level
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
  // astro
  ...eslintPluginAstro.configs.recommended,
])
