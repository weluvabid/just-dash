import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { ignores: ['**/dist/**'] },
  {
    rules: {
      indent: ['error', 2],
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
];
