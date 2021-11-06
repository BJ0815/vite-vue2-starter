import { defineConfig, loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, path.resolve(__dirname, "config")),
  };

  return defineConfig({
    plugins: [
      createVuePlugin(),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
    ],
    base: process.env.VITE_BASE_URL || "/",
    envDir: path.resolve(__dirname, "config"),
    server: {
      port: 8080,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    build: {
      chunkSizeWarningLimit: 600,
      outDir: "dist" + process.env.VITE_BASE_URL,
    },
  });
};
