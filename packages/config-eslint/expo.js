const base = require("./base.js");
const { FlatCompat } = require("@eslint/eslintrc");
const { dirname } = require("path");
const { fileURLToPath } = require("url");
const tseslint = require("typescript-eslint");
const reactEsLintConfig = require("./react.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const configs = [
  ...compat.extends("expo"),
  ...base,
  {
    ignorePatterns: ["/dist/*"],
  },
];

module.exports = tseslint.config(reactEsLintConfig, configs);
