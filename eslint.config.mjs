import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
    ignores: [
      "**/*.config.js",
      "**/*.config.mjs",
      "**/paystack.service.js"
    ],
  },
  {
    files: ["**/*.js"], // Ensure this matches your JavaScript files
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
  },
];
