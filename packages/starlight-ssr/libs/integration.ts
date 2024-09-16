import type { AstroIntegration } from 'astro'

// import type { Schema } from './schema'
import { vitePluginStarlightSSRSchemas } from './vite'

export function starlightSSRIntegration(): AstroIntegration {
  const starlightSSR: AstroIntegration = {
    name: 'starlight-ssr',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig }) => {
        injectRoute({
          entrypoint: 'starlight-ssr/route',
          pattern: `column/[...SSRSlug]`,
          prerender: false,
        })

        updateConfig({
          vite: {
            plugins: [vitePluginStarlightSSRSchemas()],
          },
        })
      },
    },
  }

  return starlightSSR
}
