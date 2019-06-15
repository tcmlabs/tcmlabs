# eslint-config-tcmlabs

A very opinionated ESLint configuration, with `@typescript-eslint/parser` and `prettier` preconfigured.

## Enabling ESLint --fix on save in VS Code

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": true // Ensure we still format config files in root folder
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "[typescriptreact]": {
    "editor.formatOnSave": false
  },
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```
