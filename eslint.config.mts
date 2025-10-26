const tseslint = require('@typescript-eslint/eslint-plugin');
const pluginReact = require('eslint-plugin-react');
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: { js, "@typescript-eslint": tseslint, react: pluginReact },
    languageOptions: { globals: globals.browser },
    extends: ["js/recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
  },
];
