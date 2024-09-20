// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
// import starlightSSR from "starlight-squidex";
import starlightSSR from "starlight-ssr";

import netlify from "@astrojs/netlify";
import { COLUMN_ARTICLE_PATH } from "./src/helpers/constants";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    starlight({
      prerender: false,
      title: "My CMS Column",
      plugins: [
        starlightSSR({
          entrypoint: "./src/components/Route.astro",
          pattern: `${COLUMN_ARTICLE_PATH}/[slug]`,
        }),
      ],
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: netlify(),
});
