import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { MarkdownHeading } from "astro";
// import { Schema } from './schema'
import type { StarlightSSRUserConfig } from "../utils/user-config";

const starlightOpenAPISidebarGroupsLabel = Symbol(
  "StarlightOpenAPISidebarGroupsLabel"
);

export function getSidebarGroupsPlaceholder(): SidebarGroup[] {
  return [
    {
      collapsed: false,
      items: [],
      label: starlightOpenAPISidebarGroupsLabel.toString(),
    },
  ];
}

// export function getPageProps(title: string, schema: Schema): StarlightPageProps {

//   return {
//     frontmatter: {
//       title,
//     },
//     headings: getOperationHeadings(schema, pathItemOperation),
//   }
// }

export function makeSidebarGroup(
  label: string,
  items: SidebarManualGroup["items"],
  collapsed: boolean
): SidebarManualGroup {
  return { collapsed, items, label };
}

export function makeSidebarLink(label: string, link: string): SidebarLink {
  return { label, link };
}

function isSidebarManualGroup(
  item: NonNullable<StarlightUserConfigSidebar>[number]
): item is SidebarManualGroup {
  return typeof item !== "string" && "items" in item;
}

type SidebarGroup =
  | SidebarManualGroup
  | {
      autogenerate: {
        collapsed?: boolean;
        directory: string;
      };
      collapsed?: boolean;
      label: string;
    };

export interface SidebarManualGroup {
  collapsed?: boolean;
  items: (SidebarLink | SidebarGroup)[];
  label: string;
}

interface SidebarLink {
  label: string;
  link: string;
}

interface StarlightPageProps {
  frontmatter: {
    title: string;
  };
  headings: MarkdownHeading[];
}

type StarlightUserConfigSidebar = StarlightUserConfig["sidebar"];
