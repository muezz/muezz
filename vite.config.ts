import { defineConfig, lazyPlugins } from "vite-plus";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  fmt: {
    ignorePatterns: [".claude/**", ".github/**", "public/**", "src/routeTree.gen.ts"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ["src/routeTree.gen.ts"],
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
  resolve: { tsconfigPaths: true },
  // Unit tests exercise plain modules, so they skip the app/server plugins.
  plugins: lazyPlugins(() =>
    process.env.VITEST
      ? []
      : [
          cloudflare({ viteEnvironment: { name: "ssr" } }),
          tailwindcss(),
          tanstackStart(),
          viteReact(),
        ],
  ),
});
