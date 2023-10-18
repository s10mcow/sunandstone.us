import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    define: {
      "import.meta.env": {},
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          buffer: "globalThis.Buffer",
          global: "globalThis",
        },
      },
    },
    plugins: [
      tsconfigPaths(),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      svgr({ svgrOptions: { icon: true } }),
      eslint({
        failOnWarning: false,
        failOnError: false,
      }),
    ],
    server: {
      open: true,
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/testing/setup.ts"],
    },
  };
});
