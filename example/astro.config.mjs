// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
// import starlightSSR from "starlight-squidex";
import starlightSSR from "starlight-ssr";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',

  integrations: [
    starlight({
      prerender: false,
      title: "My CMS Column",
      plugins: [starlightSSR()],
    }),
  ],

  adapter: netlify(),
});