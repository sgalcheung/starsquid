import { createSquidexCollections } from "starsquid/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { squidexClient } from "./data/core/client";
import { SCHEMAS } from "./data/models/schemas";

const squidexCollections = createSquidexCollections({
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClient: squidexClient,
  squidexSchemas: [SCHEMAS.AUTHORS, SCHEMAS.INTRODUCTIONS],
});

const docsCollectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("integration"),
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
  ...squidexCollections,
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: docsCollectionSchema }),
  }),
};
