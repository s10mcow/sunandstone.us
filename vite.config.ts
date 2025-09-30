import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import viteImagemin from "vite-plugin-imagemin";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
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
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 85 },
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
