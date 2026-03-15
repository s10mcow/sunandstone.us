import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
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
    // Enable CSS code splitting for better performance
    cssCodeSplit: true,
    // Minify CSS
    cssMinify: true,
    // Enable source maps for debugging but optimize for production
    sourcemap: false,
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
    viteCompression({ algorithm: "gzip" }),
    viteCompression({ algorithm: "brotliCompress" }),
  ],
  server: {
    open: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
}));
