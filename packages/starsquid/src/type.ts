import type { SquidexClient } from "@squidex/squidex";
import type { z } from "astro/zod";

export interface LoaderCollectionOpts<T extends string = string> {
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
  squidexContentSchemaMapping?: Record<T, z.ZodTypeAny>;
}

