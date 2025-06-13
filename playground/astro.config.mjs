import starlight from "@astrojs/starlight";
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import { refreshContentIntegration } from "starsquid/integrations";
import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";

const env = loadEnv("", process.cwd(), "");

export default defineConfig({
  output: "server",

  integrations: [
    starlight({
      prerender: false,
      title: "StarSquid",
      favicon: "/starsquid_favicon.svg",
      logo: {
        light: "/src/assets/logo-light.svg",
        dark: "/src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      locales: {
        root: {
          label: "English",
          lang: "en", // lang is required for root locales
        },
        // TODO: call translate API to implement i18n
        // Simplified Chinese docs in `src/content/docs/zh-cn/`
        // "zh-cn": {
        //   label: "简体中文",
        //   lang: "zh-CN",
        // },
      },
      social: [
        {
          icon: "github",
          label: "Github",
          href: "https://github.com/sgalcheung/starsquid",
        },
      ],
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
        { label: "Features", autogenerate: { directory: "/docs/features" } },
        { label: "Changelog", link: "/docs/changelog/" },
        { label: "Demo", link: "/" },
      ],
      routeMiddleware: "./src/routeMiddleware.ts",
      components: {
        ThemeSelect: "./src/overrides/ThemeSelect.astro",
        Sidebar: "./src/overrides/Sidebar.astro",
        PageTitle: "./src/overrides/PageTitle.astro",
      },
      customCss: ["./src/styles/starlight.css"],
    }), // only support for developing environment
    refreshContentIntegration(env.WEBHOOK_SECRET),
    react({
      include: ["**/react/*"],
    }),
    solidJs({
      include: ["**/solid/*", "**/icons/solid/**"],
    }),
  ],

  // not support for now!
  // env: {
  //   schema: {
  //     WEBHOOK_SECRET: envField.string({
  //       context: "server",
  //       access: "secret",
  //     }),
  //   },
  // },
  adapter: vercel(),
  session: {
    driver: "redis",
    options: {
      url: env.REDIS_URL,
    },
  },
  env: {
    schema: {
      SQUIDEX_URL: envField.string({
        context: "client",
        access: "public",
      }),
      SQUIDEX_APP_NAME: envField.string({
        context: "client",
        access: "public",
      }),
      SQUIDEX_CLIENT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      SQUIDEX_CLIENT_SECRET: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
