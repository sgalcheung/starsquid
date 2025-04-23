import { squidexCollections } from "desquidex/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { getSquidexContentSchemaMapping } from "./content/schemas";
import { docsLoader } from "@astrojs/starlight/loaders";

const defaultCollections = squidexCollections({
	squidexUrl: import.meta.env.SQUIDEX_URL,
	squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
	squidexClientId: import.meta.env.SQUIDEX_CLIENT_ID,
	squidexClientSecret: import.meta.env.SQUIDEX_CLIENT_SECRET,
	squidexContentSchemaMapping: getSquidexContentSchemaMapping(),
});

export const collections = {
	...defaultCollections,
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
