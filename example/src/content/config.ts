import { squidexCollections } from "desquidex/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

const defaultCollections = squidexCollections({
  squidexUrl: import.meta.env.SQUIDEX_URL,
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClientId: import.meta.env.SQUIDEX_CLIENT_ID,
  squidexClientSecret: import.meta.env.SQUIDEX_CLIENT_SECRET,
});
// TODO: when support custom default collection, remove this.
export const collections = {
  ...defaultCollections,
  docs: defineCollection({ schema: docsSchema() }),
};
