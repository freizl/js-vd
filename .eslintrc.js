// Root .eslintrc config is for node packages. Client side is overridden
// in the packages directory.
module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es6': true
    // 'jest/globals': true
  },
  'plugins': [],
  'extends': 'eslint:recommended',
  'rules': {
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  },
  'parserOptions': {
    'ecmaVersion': 2015,
  },
};
