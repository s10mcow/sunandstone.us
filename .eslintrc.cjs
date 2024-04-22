module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  "plugins": ["@typescript-eslint", "unused-imports"],
  "root": true,
  "rules": {
    "@typescript-eslint/ban-ts-comment": "off",
    "no-console": "error",
    "react/no-unescaped-entities": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};

