import { z } from 'astro/zod'
// import type { OpenAPI } from 'openapi-types'

// import { getBaseLink, stripLeadingAndTrailingSlashes } from './path'
// import { getPathItemSidebarGroups, getWebhooksSidebarGroups } from './pathItem'
// import { makeSidebarGroup, makeSidebarLink, type SidebarManualGroup } from './starlight'


// export function getSchemaSidebarGroups(schema: Schema): SidebarManualGroup {
//   // const { config, document } = schema

//   return makeSidebarGroup(
//     config.label ?? document.info.title,
//     [
//       makeSidebarLink('Overview', getBaseLink(config)),
//       ...getPathItemSidebarGroups(schema),
//       ...getWebhooksSidebarGroups(schema),
//     ],
//     config.collapsed,
//   )
// }

// export type StarlightSSRSchemaConfig = z.infer<typeof SchemaConfigSchema>

export const PostSchema = z.object({
  description: z.string(),
});

export type PostSSRSchema = z.infer<typeof PostSchema>;

export interface Schema {
  document: PostSSRSchema;
}
