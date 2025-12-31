import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"]
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ["**/*.test.js", "**/*.spec.js", "**/setupTests.js", "src/__mocks__/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      }
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
];