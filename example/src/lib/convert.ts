import type { IntroQuery } from "@/__generated__/graphql";
import { COLUMN_ARTICLE_PATH } from "@/helpers/constants";

// Extract intros[0].flatData.chapters type
type ChaptersType = NonNullable<
  NonNullable<IntroQuery["intros"]>[0]["flatData"]["chapters"]
>;

export function dataMap(chapters: ChaptersType) {
  if (!chapters) {
    return [];
  }

  return chapters.map((sidebarItem) => ({
    label: sidebarItem.title!, // Chapter, secondary directory
    items:
      sidebarItem.articles!.map((item) => ({
        label: item.flatData.name!,
        link: `/${COLUMN_ARTICLE_PATH}/${item.id}`,
      })) ?? [],
  }));
}
