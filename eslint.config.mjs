import { FlatCompat } from '@eslint/eslintrc'
import pluginReact from 'eslint-plugin-react'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
  {
    ...pluginReact.configs.flat['jsx-runtime'],
    rules: {
      'react/jsx-sort-props': ['error'],
    },
  },
]

export default eslintConfig
