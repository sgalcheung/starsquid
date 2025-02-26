import "dotenv/config";
import starlight from "@astrojs/starlight";
import { defineConfig, envField } from "astro/config";
import netlify from "@astrojs/netlify";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
import { refreshContentIntegration } from "desquidex/integrations";

const env = loadEnv("", process.cwd(), "");

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
			routeMiddleware: "./src/routeMiddleware.ts",
			components: {
				StarlightPage: "./src/components/StarlightPage.astro",
			},
		}),
		refreshContentIntegration(env.WEBHOOK_SECRET), // only support for developing environment
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
