module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-var-requires': 1,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [
      2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': "off",
    'max-len': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
