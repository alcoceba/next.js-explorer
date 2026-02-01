// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [{
  files: ["**/*.{js,mjs,cjs,jsx}"]
}, {
  languageOptions: {
    globals: globals.browser
  }
}, {
  files: ["**/*.test.js", "**/*.spec.js", "**/setupTests.js", "src/__mocks__/**"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
    }
  },
}, pluginJs.configs.recommended, pluginReact.configs.flat.recommended, {
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
}, ...storybook.configs["flat/recommended"]];