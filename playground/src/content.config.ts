import { squidexCollections } from "starsquid/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { squidexClient } from "./data/core/client";
import { SCHEMAS } from "./data/models/schemas";

const defaultCollections = squidexCollections({
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClient: squidexClient,
  squidexSchemas: [SCHEMAS.APP, SCHEMAS.NEWS, SCHEMAS.AUTHORS, SCHEMAS.INTRODUCTIONS]
});

export const collections = {
  ...defaultCollections,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
