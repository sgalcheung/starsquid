import { squidexCollections } from "starsquid/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { getSquidexContentSchemaMapping } from "@/content/schemas";
import { docsLoader } from "@astrojs/starlight/loaders";
import { squidexClient } from "./scripts/clinet";

const defaultCollections = squidexCollections({
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClient: squidexClient,
  squidexContentSchemaMapping: getSquidexContentSchemaMapping(),
});

export const collections = {
  ...defaultCollections,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
