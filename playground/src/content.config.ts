import { squidexCollections } from "desquidex/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { getSquidexContentSchemaMapping } from "./content/schemas";

const defaultCollections = squidexCollections({
  squidexUrl: import.meta.env.SQUIDEX_URL,
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClientId: import.meta.env.SQUIDEX_CLIENT_ID,
  squidexClientSecret: import.meta.env.SQUIDEX_CLIENT_SECRET,
  // squidexContentSchemas: SQUIDEX_CONTENT_SCHEMAS,
  // squidexContentSchemaTypes: [introductionSchema],
  // squidexContentSchemaMapping: SQUIDEXCONTENTSCHEMAMAPPING,
  squidexContentSchemaMapping: await getSquidexContentSchemaMapping(),
});
// TODO: when support custom default collection, remove this.
export const collections = {
  ...defaultCollections,
  docs: defineCollection({ schema: docsSchema() }),
};
