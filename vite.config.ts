import { defineConfig, mergeConfig } from "vite";
import viteConfigReact from "@thesparklaboratory/vite-config-react";

const overrides = defineConfig(() => ({
  // Overrides can be specified here
}));
export default defineConfig((env) =>
  mergeConfig(viteConfigReact(env), overrides(env)),
);
