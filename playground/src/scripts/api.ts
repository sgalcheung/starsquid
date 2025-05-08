import { inspect } from "node:util";
import { GRAPHQL_URL, executeOperation } from "./graphql";
import type {
	ArticleQuery,
	IntroQuery,
	SidebarQuery,
} from "generated/gql/graphql";
import { graphql } from "generated/gql";

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
              id
              flatData {
                name
              }
            }
          }
        }
      }
    }
  `);

	return await executeOperation(GRAPHQL_URL, query, {
		filter: `data/slug/iv eq '${slug}'`,
	}).then((r) => {
		if (r.errors) {
			console.log(
				inspect(r.errors, { depth: Number.POSITIVE_INFINITY, colors: true }),
			);
			throw new Error("Failed to execute GraphQL query");
		}
		return r.data as IntroQuery;
	});
}

export async function getArticle(
	id: string | undefined,
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

	return await executeOperation(GRAPHQL_URL, query, {
		filter: `id eq '${id}'`,
	}).then((r) => {
		if (r.errors) {
			console.log(
				inspect(r.errors, { depth: Number.POSITIVE_INFINITY, colors: true }),
			);
			throw new Error("Failed to execute GraphQL query");
		}
		return r.data as ArticleQuery;
	});
}

export async function getSidebar(
	articleId: string | undefined,
): Promise<SidebarQuery> {
	const query = graphql(`
    query Sidebar($filter: String!) {
      sidebars: queryIntroductionsContents(filter: $filter) {
        flatData {
          chapters {
            title
            articles {
              id
              flatData {
                name
              }
            }
          }
        }
      }
    }
  `);

	return await executeOperation(GRAPHQL_URL, query, {
		filter: `data/chapters/iv/articles eq '${articleId}'`,
	}).then((r) => {
		if (r.errors) {
			console.log(
				inspect(r.errors, { depth: Number.POSITIVE_INFINITY, colors: true }),
			);
			throw new Error("Failed to execute GraphQL query");
		}
		return r.data as SidebarQuery;
	});
}
