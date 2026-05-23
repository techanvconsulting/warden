import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'

// Flat config (eslint 9). Built directly from each plugin's native flat config
// instead of FlatCompat — eslint-config-next 16 + FlatCompat crashes under
// eslint 9/10. Mirrors the previous `next/core-web-vitals` + prettier setup.
export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**/*.js',
      'tina/__generated__/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      // classic react-hooks rules only (v5 recommended-latest adds opinionated
      // React-Compiler rules the project doesn't follow)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // mark JSX-referenced identifiers as used so no-unused-vars is JSX-aware
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'no-unused-vars': 'error',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  prettierConfig,
]
