import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { MarkdownHeading } from "astro";
// import { Schema } from './schema'
import { getIntro } from "squidex/src/lib/api";
import type { StarlightSSRUserConfig } from "../utils/user-config";
import type { IntroQuery } from "squidex/src/__generated__/graphql";

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

// Extract intros[0].flatData.chapters type
type ChaptersType = NonNullable<
  NonNullable<IntroQuery["intros"]>[0]["flatData"]["chapters"]
>;

// if get data method moved, it will be move too.
export function dataMap(chapters: ChaptersType, subPath: string) {
  if (!chapters) {
    return [];
  }

  return chapters.map((sidebarItem) => ({
    label: sidebarItem.title!, // Chapter, secondary directory
    items:
      sidebarItem.articles!.map((item) => ({
        label: item.flatData.name!,
        link: `/${subPath}/${item.flatData.slug!}`,
      })) ?? [],
  }));
}

export async function getSidebar(
  userConfig: StarlightSSRUserConfig
): Promise<StarlightUserConfigSidebar> {
  const subPath = userConfig.pattern.substring(
    0,
    userConfig.pattern.indexOf("/[")
  );

  // TODO: Should to dynatic get slug
  const slug = "hotel-directory";

  const { intros } = await getIntro(slug);

  if (!intros || intros.length !== 1) return [];

  const chapters = intros[0].flatData.chapters!;

  const sidebar: StarlightUserConfigSidebar = dataMap(chapters, subPath);

  return sidebar;
}

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
