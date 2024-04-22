import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  build: {
    outDir: "dist",
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
    svgrPlugin({ svgrOptions: { icon: true } }),
    eslintPlugin({
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
  },
}));
