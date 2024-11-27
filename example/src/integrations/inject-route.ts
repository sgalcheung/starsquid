import type { AstroIntegration } from "astro";

export type Config = {
  entrypoint: string;
  pattern: string;
  prerender?: boolean;
};

export default function injectRouteIntegration(
  config: Config
): AstroIntegration {
  return {
    name: "inject-route",
    hooks: {
      "astro:config:setup": (options) => {
        options.injectRoute({
          entrypoint: config.entrypoint,
          pattern: config.pattern,
          prerender: config.prerender ?? false,
        });
      },
    },
  };
}
