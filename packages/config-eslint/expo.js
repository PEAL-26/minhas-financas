import base from "./base.js";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import tseslint from "typescript-eslint";
import reactEsLintConfig from "./react.js";

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

export default tseslint.config(reactEsLintConfig, configs);
