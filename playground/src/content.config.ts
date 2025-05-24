import { squidexCollections } from "starsquid/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { squidexClient } from "./data/core/client";
import { SCHEMAS } from "./data/models/schemas";

const defaultCollections = squidexCollections({
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClient: squidexClient,
  squidexSchemas: [SCHEMAS.APP, SCHEMAS.NEWS, SCHEMAS.AUTHORS, SCHEMAS.INTRODUCTIONS]
});

const docsCollectionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('integration'),
    replaceTitle: z.boolean().optional().default(true),
    packageName: z.string(), // required for integration
    githubURL: z.string(), // required for integration
  }),
  z.object({
    type: z.undefined(),
    replaceTitle: z.boolean().optional().default(true),
    packageName: z.string().optional(),
    githubURL: z.string().optional(),
  }),
]);

export const collections = {
  ...defaultCollections,
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: docsCollectionSchema }),
  }),
};
