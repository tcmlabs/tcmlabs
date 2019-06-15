const prettierrc = {
  useTabs: false,
  printWidth: 90,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  jsxBracketSameLine: false
};

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint",
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended"
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array. This also makes prettier runs (autoformats) as an ESLint rule
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": [
      "error",
      prettierrc,
      {
        usePrettierrc: true
      }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      {
        accessibility: "no-public"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ]
  }
};
