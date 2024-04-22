module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
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

