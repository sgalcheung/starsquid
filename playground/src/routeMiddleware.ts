import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { CATALOGS_CACHE_TIMEOUT, COLUMN, COLUMN_ARTICLE_PATH } from "./helpers/constants";
import { dataMap, type CatalogType } from "./scripts/convert";
import { getIntroductionBySlug } from "./content/schemas/Introduction";

export const onRequest = defineRouteMiddleware(async (context) => {
  // Get the base path and id of the current URL
  // e.g. `/column/article/40539a53-1b28-43ba-82eb-e7f27537a550` returns `column/article` and `40539a53-1b28-43ba-82eb-e7f27537a550`
  const parts = context.url.pathname
    .split("/")
    .filter((part) => part.length > 0);
  const column_article = parts.slice(0, 2).join("/");
  const article_id = parts[2];

  if (column_article !== COLUMN_ARTICLE_PATH) {
    return;
  }

  const starlightRoute = context.locals.starlightRoute;

  const column_name = context.cookies.get(COLUMN)?.value;
  if (!column_name) {
    return;
  }
  const sessionData = await context.session?.get(column_name) || '[]';
  let catalogs = JSON.parse(sessionData) as CatalogType;

  if (!catalogs || catalogs.length === 0) {
    const intro = await getIntroductionBySlug(column_name);
    if (intro) {
      catalogs = await dataMap(intro);
      context.session?.set(
        column_name,
        JSON.stringify(catalogs),
        { ttl: CATALOGS_CACHE_TIMEOUT, }
      );
    }
  }

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
