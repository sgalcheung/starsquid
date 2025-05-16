import type { SquidexClient } from "@squidex/squidex";

export interface LoaderCollectionOpts {
  /** The squidex app name */
  squidexAppName: string;
  /** The squidex client Id. Defaults to SQUIDEX_CLIENT_ID env var */
  squidexClientId?: string;
  /** The squidex client secret. Defaults to SQUIDEX_CLIENT_SECRET env var */
  squidexClientSecret?: string;
  /** The squidex url. Defaults to SQUIDEX_URL env var */
  squidexUrl?: string;
  /** The object of squidex client */
  squidexClient?: SquidexClient;
  /** The schema name array of squidex */
  squidexSchemas: Array<string>;
}

