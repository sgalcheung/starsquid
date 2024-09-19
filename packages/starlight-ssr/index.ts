import type { StarlightPlugin } from "@astrojs/starlight/types";
import { starlightSSRIntegration } from "./libs/integration";

import { validateConfig, type StarlightSSRUserConfig } from './libs/config'
// import { starlightOpenAPIIntegration } from './libs/integration'
// import { parseSchema } from './libs/parser'
// import { getSidebarFromSchemas, getSidebarGroupsPlaceholder } from './libs/starlight'
import { getSidebar } from "./libs/starlight";

// export const openAPISidebarGroups = getSidebarGroupsPlaceholder()

export default function starlightSSRPlugin(
  userConfig: StarlightSSRUserConfig
): StarlightPlugin {
  return {
    name: "starlight-ssr-plugin",
    hooks: {
      setup: async ({
        addIntegration,
        command,
        config: starlightConfig,
        logger,
        updateConfig,
      }) => {
        if (command !== "build" && command !== "dev") {
          return;
        }

        const config = validateConfig(logger, userConfig);

        addIntegration(starlightSSRIntegration(config));

        const sidebar = await Promise.resolve(getSidebar());

        updateConfig({ sidebar });
      },
    },
  };
}
