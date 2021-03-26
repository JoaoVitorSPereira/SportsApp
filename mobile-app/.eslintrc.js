module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'react/jsx-boolean-value': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'react/style-prop-object': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'react/no-unescaped-entities': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
  },
};
