import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { COLUMN, COLUMN_ARTICLE_PATH } from "./helpers/constants";
import { getCatalog, type CatalogType } from "./scripts/convert";
import { getIntroductionBySlug } from "./content/schemas/Introduction";
import type { APIContext } from "astro";

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

  let sessionData = context.locals.catalogs;

  // Check if current article is in the current sessionData
  const isCurrent = sessionData.some(category =>
    category.items.some(item =>
      item.link.includes(article_id)
    )
  );

  // Fallback: load from session if not current or column name is missing
  const column_name = context.cookies.get(COLUMN)?.value;
  if (!isCurrent || !column_name) {
    sessionData = await findSessionDataByArticleId(context, article_id);
  }

  const catalogs = sessionData;

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

