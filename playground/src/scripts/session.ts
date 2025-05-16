import type { APIContext } from "astro";
import { getCatalog, type CatalogType } from "@/scripts/convert";
import { COLUMN, COLUMN_ARTICLE_PATH } from "@/helpers/constants";
import { getArticleReferencing } from "../data/models/Article";
import { getIntroductionBySlug, type IntroductionCollectionType, type IntroductionDtoType } from "../data/models/Introduction";

export async function loadCatalogFromSession(
  context: APIContext
): Promise<void> {
  const { pathname } = context.url;
  if (!pathname.startsWith("/intro") && !pathname.startsWith("/column")) {
    return;
  }

  let column_name: string | undefined = "";
  if (pathname.startsWith("/intro")) {
    column_name = context.params.slug;
  }
  if (pathname.startsWith("/column")) {
    column_name = context.cookies.get(COLUMN)?.value;
  }

  let catalogs: CatalogType = [];

  const sessionData = await context.session?.get(column_name ?? "") || '[]';

  const parsed = JSON.parse(sessionData);
  const isValidCatalog = Array.isArray(parsed) && parsed.length > 0;

  if (isValidCatalog) {
    if (process.env.NODE_ENV === 'development') {
      console.debug("load catalogs from session data");
    }
    catalogs = parsed as CatalogType;
  } else {
    let intro: IntroductionCollectionType | IntroductionDtoType | undefined;
    if (column_name) {
      intro = await getIntroductionBySlug(column_name);
    } else if (pathname.startsWith("/column")) {
      const parts = context.url.pathname
        .split("/")
        .filter(Boolean);
      const [first, second, article_id] = parts;
      const column_article = `${first}/${second}`;

      if (column_article !== COLUMN_ARTICLE_PATH) {
        return;
      }
      intro = await getArticleReferencing(article_id);
      column_name = intro?.data?.slug?.iv;
    }
    if (intro) {
      catalogs = await getCatalog(intro as any);
      if (column_name) {
        context.session?.set(column_name, JSON.stringify(catalogs));
        context.cookies.set(COLUMN, column_name, { path: "/" });
      }
    }
  }

  context.locals.catalogs = catalogs;
}
