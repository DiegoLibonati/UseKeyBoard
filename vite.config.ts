import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist/types",
    }),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
  build: {
    lib: {
      entry: "./src/hooks/useKeyBoard.tsx",
      name: "usekeyboard-react",
      fileName: (format) => `usekeyboard-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
