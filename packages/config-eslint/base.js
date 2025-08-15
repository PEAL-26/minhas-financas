const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");
const { fileURLToPath } = require("url");
const js = require("@eslint/js");

const configs = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "@tanstack/query"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react-hooks/exhaustive-deps": "warn",
    "@tanstack/query/exhaustive-deps": "error",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};

//const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  //baseDirectory: __dirname,
  //recommendedConfig: js.configs.recommended,
});

module.exports = { configs: compat.config(configs) };
