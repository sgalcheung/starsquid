import type { ViteUserConfig } from 'astro'

// import type { Schema } from './schema'

export function vitePluginStarlightSSRSchemas(): VitePlugin {
  const moduleId = `virtual:starlight-ssr-schemas`
  const resolvedModuleId = `\0${moduleId}`
  // const moduleContent = `export default ${JSON.stringify(
  //   Object.fromEntries(schemas.map((schema) => [schema.config.base, schema])),
  // )}`

  return {
    name: `vite-plugin-starlight-ssr-schemas`,
    load(id) {
      // return id === resolvedModuleId ? moduleContent : undefined
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined
    },
  }
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
