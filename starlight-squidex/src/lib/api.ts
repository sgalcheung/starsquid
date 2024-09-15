import { inspect } from "node:util";
import { executeOperation } from "./graphql";
import type { IndexQuery, PostQuery } from "../__generated__/graphql";
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
