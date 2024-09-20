import { inspect } from "node:util";
import { executeOperation } from "./graphql";
import type {
  ArticleQuery,
  IndexQuery,
  IntroQuery,
} from "../__generated__/graphql";
import { graphql } from "../__generated__";

function buildUrl(url: string) {
  if (url.length > 0 && url.startsWith("/")) {
    url = url.slice(1);
  }

  const result = `${import.meta.env.SQUIDEX_ENVIRONMENT}/${url}`;

  return result;
}

const GRAPHQL_URI = `api/content/${import.meta.env.SQUIDEX_APP_NAME}/graphql`;

const GRAPHQL_URL = buildUrl(GRAPHQL_URI);

const query = graphql(`
  query Index {
    contentLayout: queryPostsContents {
      flatData {
        title
        text {
          contents {
            flatData {
              name
              slug
            }
          }
        }
        slug
      }
    }
  }
`);

export const indexQuery = async () => {
  const r = await executeOperation(GRAPHQL_URL, query);

  if (r.errors) {
    console.log(inspect(r.errors, { depth: Infinity, colors: true }));
    throw new Error("Failed to execute GraphQL query");
  }

  return r.data as IndexQuery;
};

export async function getIntro(slug: string | undefined): Promise<IntroQuery> {
  const query = graphql(`
    query Intro($filter: String!) {
      intros: queryIntroductionsContents(filter: $filter) {
        flatData {
          title
          description
          chapters {
            title
            articles {
              flatData {
                name
                slug
              }
            }
          }
        }
      }
    }
  `);

  return executeOperation(GRAPHQL_URL, query, {
    filter: `data/slug/iv eq '${slug}'`,
  }).then((r) => {
    if (r.errors) {
      console.log(inspect(r.errors, { depth: Infinity, colors: true }));
      throw new Error("Failed to execute GraphQL query");
    }
    return r.data as IntroQuery;
  });
}

export async function getArticle(
  slug: string | undefined
): Promise<ArticleQuery> {
  const query = graphql(`
    query Article($filter: String!) {
      articles: queryArticlesContents(filter: $filter) {
        flatData {
          name
          content
        }
      }
    }
  `);

  return executeOperation(GRAPHQL_URL, query, {
    filter: `data/slug/iv eq '${slug}'`,
  }).then((r) => {
    if (r.errors) {
      console.log(inspect(r.errors, { depth: Infinity, colors: true }));
      throw new Error("Failed to execute GraphQL query");
    }
    return r.data as ArticleQuery;
  });
}
