import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { COLUMN, COLUMN_ARTICLE_PATH } from "./helpers/constants";
import type { CatalogType } from "./scripts/convert";
import type { APIContext } from "astro";
import { getIntroductionBySlug, type IntroductionDataSchemaType } from "./content/schemas/Introduction";
import { getArticleReferencing } from "./data/models/Article";

export const onRequest = defineRouteMiddleware(async (context) => {
  // Get the base path and id of the current URL
  // e.g. `/column/article/40539a53-1b28-43ba-82eb-e7f27537a550` returns `column/article` and `40539a53-1b28-43ba-82eb-e7f27537a550`
  const parts = context.url.pathname
    .split("/")
    .filter(Boolean);
  const [first, second, article_id] = parts;
  const column_article = `${first}/${second}`;

  if (column_article !== COLUMN_ARTICLE_PATH) {
    return;
  }

  const starlightRoute = context.locals.starlightRoute;

  let catalogData = context.locals.catalogs;
  if (!catalogData) return;
  let introData: IntroductionDataSchemaType | null = null;

  // Check if current article is in the current catalogData
  const isCurrent = catalogData.some(category =>
    category.items.some(item =>
      item.link.includes(article_id)
    )
  );

  // Fallback: load from session if not current or column name is missing
  const column_name = context.cookies.get(COLUMN)?.value;

  if (!isCurrent || !column_name) {
    catalogData = await findSessionDataByArticleId(context, article_id);
  }

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let intro;
  if (!isCurrent) {
    intro = (await getArticleReferencing(article_id))?.data;
  } else if (column_name) {
    intro = (await getIntroductionBySlug(column_name))?.data;
  } else {
    intro = (await getArticleReferencing(article_id))?.data;
  }

  if (intro) {
    introData = intro as unknown as IntroductionDataSchemaType;
  }

  if (introData) {
    context.locals.column = introData;
  }

  const catalogs = catalogData;

  starlightRoute.sidebar = catalogs.map((catalog) => ({
    type: "group",
    label: catalog.label,
    entries: catalog.items.map((item) => ({
      type: "link",
      label: item.label,
      href: item.link,
      isCurrent: item.link.endsWith(article_id),
      badge: undefined,
      attrs: {},
    })),
    collapsed: false,
    badge: undefined,
  }));

  usePageTitleInTOC(starlightRoute);
  // console.log(starlightRoute);
});

function usePageTitleInTOC(starlightRoute: StarlightRouteData) {
  const overviewLink = starlightRoute.toc?.items[0];
  if (overviewLink) {
    overviewLink.text = starlightRoute.entry.data.title;
  }
}

async function findSessionDataByArticleId(context: APIContext, article_id: string): Promise<CatalogType> {
  const entries = await context.session?.entries();
  if (!entries) return [];

  const matched = entries.find(([_, value]) =>
    JSON.stringify(value).includes(article_id)
  );

  try {
    return matched ? JSON.parse(matched[1]) : [];
  } catch {
    return [];
  }
}

