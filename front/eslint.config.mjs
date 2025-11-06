import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const localRules = require('./eslint-local-rule')

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.git/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    files: ['eslint-local-rules/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    Plugins: {
      'local-rules': {
        rules: localRules
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'local-rules/restrict-service-imports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: 'next/**',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: '@/features/**' ,
              group: 'internal',
              position: 'after'
            },
            {
              patter: '@/shared/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@/external/**',
              group: 'internal',
              position: 'after'
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          warnOnUnassignedImports: true
        }
      ]

    }
  }
]

export default eslintConfig
