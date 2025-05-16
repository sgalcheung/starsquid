import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { COLUMN, COLUMN_ARTICLE_PATH } from "./helpers/constants";
import type { CatalogType } from "./scripts/convert";
import type { APIContext } from "astro";
import { getArticleReferencing } from "./data/models/Article";
import { getIntroductionBySlug, type IntroductionCollectionType, type IntroductionDtoType } from "./data/models/Introduction";

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

  let intro: IntroductionCollectionType | IntroductionDtoType | undefined;
  if (!isCurrent) {
    intro = await getArticleReferencing(article_id);
  } else if (column_name) {
    intro = await getIntroductionBySlug(column_name);
  } else {
    intro = await getArticleReferencing(article_id);
  }

  let introData: IntroductionDtoType | null = null;
  if (intro) {
    introData = 'collection' in intro
      ? (intro.data as IntroductionDtoType)
      : (intro as IntroductionDtoType);
  }

  if (introData) {
    context.locals.column = introData;
  }

  renderSideBar(starlightRoute, catalogData, article_id)

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

function renderSideBar(starlightRoute: StarlightRouteData, catalogs: CatalogType, article_id: string) {
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
}

