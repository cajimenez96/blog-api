module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error', { allow: ['info', 'error'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'], allowAfterThis: true }],
  },
};