import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas";
import { COLUMN_ARTICLE_PATH } from "@/helpers/constants";
import { getEntry, type CollectionEntry } from "astro:content";

// Extract intros[0].flatData.chapters type
// type ChaptersType = NonNullable<
//   NonNullable<IntroQuery["intros"]>[0]["flatData"]["chapters"]
// >;

export interface CatalogType
	extends Array<{
		label: string;
		items: Array<{
			label: string;
			link: string;
		}>;
	}> {}

export async function dataMap(
	intro: CollectionEntry<SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS>,
): Promise<CatalogType> {
	const chapters = intro.data.data.chapters?.iv ?? [];
	if (!chapters) {
		return [];
	}

	// const articles = await getCollection(SQUIDEX_CONTENT_SCHEMAS.ARTICLES);
	const articleIds = chapters.flatMap((c) => c.articles);
	const articles = await Promise.all(
		articleIds.map(
			async (id) => await getEntry(SQUIDEX_CONTENT_SCHEMAS.ARTICLES, id),
		),
	);

	intro.data.referenceData = intro.data.referenceData || {};
	intro.data.referenceData.articles = intro.data.referenceData.articles || {};

	// console.log("--before--", intro.data.referenceData.articles);
	for (const article of articles) {
		if (article) {
			if (intro.data.referenceData?.articles) {
				intro.data.referenceData.articles[article.id] = article.data.data;
			}
		}
	}
	// console.log("--after--",intro.data.referenceData.articles);

	return chapters.map((sidebarItem) => {
		return {
			label: sidebarItem.title ?? "Untitled", // Chapter, secondary directory
			items:
				sidebarItem.articles.map((id) => {
					const article = intro.data.referenceData?.articles[id];
					return {
						label: article?.name?.iv ?? "Unknown",
						link: `/${COLUMN_ARTICLE_PATH}/${id}`,
					};
				}) ?? [],
		};
	});
}
