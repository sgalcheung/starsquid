import type { SquidexClient } from "@squidex/squidex";
import type { z } from "astro/zod";

export interface LoaderCollectionOpts<T extends string = string> {
  squidexAppName: string;
  squidexClientId: string;
  squidexClientSecret: string;
  squidexUrl: string;
  squidexClient?: SquidexClient;
  squidexContentSchemaMapping?: Record<T, z.ZodTypeAny>;
}

