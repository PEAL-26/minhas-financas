const base = require("./base.js");
// const { FlatCompat } = require("@eslint/eslintrc");
// const { dirname } = require("path");
// const { fileURLToPath } = require("url");
// const tseslint = require("typescript-eslint");
// const reactEsLintConfig = require("./react.js");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

const configs = [
  // ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...base.configs,
  // {
  //   rules: {
  //     "react-hooks/exhaustive-deps": "warn",
  //   },
  // },
];

module.exports = { configs }; // tseslint.config(/*reactEsLintConfig,*/ configs);
