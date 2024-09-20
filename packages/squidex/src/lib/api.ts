import { inspect } from "node:util";
import { executeOperation } from "./graphql";
import type { IndexQuery, IntroQuery, PostQuery } from "../__generated__/graphql";
import { graphql } from "../__generated__";

// LOAD ENVIRONMENT VARIABLES
// import { loadEnv } from "vite";

// const { SQUIDEX_ENVIRONMENT, SQUIDEX_APP_NAME } = loadEnv(
//   "all",
//   process.cwd(),
//   "SQUIDEX_"
// );


import { config as loadDotenv } from "dotenv";
import { resolve } from "path";

loadDotenv({
  path: resolve(process.cwd(), ".env"),
});


// SETUP SQUIDEX API
const squidexEnvironment = process.env.SQUIDEX_ENVIRONMENT || "";
const squiexAppName = process.env.SQUIDEX_APP_NAME || "";

function buildUrl(url: string) {
  if (url.length > 0 && url.startsWith("/")) {
    url = url.slice(1);
  }

  const result = `${squidexEnvironment}/${url}`;

  return result;
}

const GRAPHQL_URI = `api/content/${squiexAppName}/graphql`;

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

export async function getPost(slug: string | undefined): Promise<PostQuery> {
  const query = graphql(`
    query Post($filter: String!) {
      posts: queryHotelsContents(filter: $filter) {
        flatData {
          name
          description
          photos {
            url
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
    return r.data as PostQuery;
  });
}
