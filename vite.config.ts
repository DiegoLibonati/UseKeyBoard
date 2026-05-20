import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import type { UserConfig } from "vite";

const LIB_NAME = "usekeyboard-react";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      outDir: "dist/types",
      insertTypesEntry: true,
      exclude: [
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.test.*",
        "**/*.spec.*",
        "__tests__/**",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@tests": path.resolve(import.meta.dirname, "./__tests__"),
    },
  },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: LIB_NAME,
      fileName: (format) => `${LIB_NAME}.${format}.js`,
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    target: "ES2022",
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
}) as UserConfig;
