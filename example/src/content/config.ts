import { squidexCollections } from "desquidex/loaders";

export const collections = squidexCollections({
  squidexUrl: import.meta.env.SQUIDEX_URL,
  squidexAppName: import.meta.env.SQUIDEX_APP_NAME,
  squidexClientId: import.meta.env.SQUIDEX_CLIENT_ID,
  squidexClientSecret: import.meta.env.SQUIDEX_CLIENT_SECRET,
});
