import "dotenv/config";
// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig, envField } from "astro/config";
// import starlightSSR from "starlight-squidex";
// import starlightSSR from "starlight-ssr";

import netlify from "@astrojs/netlify";
import { COLUMN_ARTICLE_PATH } from "./src/helpers/constants";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
import { refreshContentIntegration } from "desquidex/integrations";
import injectRouteIntegration from "./src/integrations/inject-route";

const env = loadEnv("", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	output: "server",

	integrations: [
		starlight({
			prerender: false,
			title: "Starlight Squidex",
			social: {
				github: "https://github.com/sgalcheung/starlight-squidex",
			},
			sidebar: [
				{
					label: "Get Started",
					items: [
						{
							label: "Prerequisites",
							link: "/docs/get-started/prerequisites/",
						},
						{
							label: "Quickstarted",
							link: "/docs/get-started/quick-started/",
						},
					],
				},
				{ label: "Demo", link: "/" },
			],
			plugins: [
				// starlightSSR({
				//   entrypoint: "./src/components/Route.astro",
				//   pattern: `${COLUMN_ARTICLE_PATH}/[id]`,
				// }),
			],
		}),
		injectRouteIntegration({
			entrypoint: "./src/components/Route.astro",
			pattern: `${COLUMN_ARTICLE_PATH}/[id]`,
		}),
		refreshContentIntegration(env.WEBHOOK_SECRET), // why have end name Integration?
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
	],

	adapter: netlify(),

	// not support for now!
	// env: {
	//   schema: {
	//     WEBHOOK_SECRET: envField.string({
	//       context: "server",
	//       access: "secret",
	//     }),
	//   },
	// },
});
