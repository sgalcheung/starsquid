import type { AstroIntegration } from "astro";
// import type { Schema } from './schema'
import { vitePluginStarlightSSRSchemas } from "./vite";
import type { StarlightSSRUserConfig } from "../utils/user-config";

export function starlightSSRIntegration(
  userConfig: StarlightSSRUserConfig
): AstroIntegration {
  const starlightSSR: AstroIntegration = {
    name: "starlight-ssr",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig }) => {
        injectRoute({
          entrypoint: userConfig.entrypoint,
          pattern: userConfig.pattern,
          prerender: false,
        });

        updateConfig({
          vite: {
            plugins: [vitePluginStarlightSSRSchemas()],
          },
        });
      },
    },
  };

  return starlightSSR;
}
