import type { IntroQuery } from "@/__generated__/graphql";
import { COLUMN_ARTICLE_PATH } from "@/helpers/constants";

// Extract intros[0].flatData.chapters type
// type ChaptersType = NonNullable<
//   NonNullable<IntroQuery["intros"]>[0]["flatData"]["chapters"]
// >;

export function dataMap(intro: any) {
  const chapters = intro.data!.chapters.iv!;
  if (!chapters) {
    return [];
  }

  return chapters.map((sidebarItem: any) => ({
    label: sidebarItem.title!, // Chapter, secondary directory
    items:
      sidebarItem.referenceArticles!.map((item: any) => ({
        label: item.name.iv!,
        link: `/${COLUMN_ARTICLE_PATH}/${item.id}`,
      })) ?? [],
  }));
}
