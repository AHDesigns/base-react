module.exports = {
  extends: ['react-app', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }]
  },
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      node: {
        paths: [
          "src/"
        ]
      }
    }
  }
}
