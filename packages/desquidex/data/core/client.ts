import { configService } from "../../configService";
import { SquidexClient } from "@squidex/squidex";
import { InMemoryTokenStore } from "@squidex/squidex/dist/wrapper/SquidexClient.js";
import type { ContentsDto } from "../internals/ContentsDtoT";
import type { SCHEMAS } from "../models/schemas";

let singleClient: {
  client: SquidexClient;
  create: (app: string) => SquidexClient;
};

export function getClient() {
  if (singleClient) {
    return singleClient;
  }

  const { squidexUrl, squidexAppName, squidexClientId, squidexClientSecret } =
    configService.getConfig();

  const client = new SquidexClient({
    appName: squidexAppName!,
    clientId: squidexClientId!,
    clientSecret: squidexClientSecret!,
    url: squidexUrl!,
    tokenStore: new InMemoryTokenStore(),
  });

  const create = (app: string) => {
    return new SquidexClient({
      appName: app!,
      clientId: squidexClientId!,
      clientSecret: squidexClientSecret!,
      url: squidexUrl!,
      tokenStore: new InMemoryTokenStore(),
    });
  };

  singleClient = { client, create };

  return singleClient;
}

// export const client = new SquidexClient({
//   appName: squidexAppName!,
//   clientId: squidexClientId!,
//   clientSecret: squidexClientSecret!,
//   url: squidexUrl!,
//   tokenStore: new InMemoryTokenStore(),
//   // tokenStore: new StorageTokenStore() // Keep the tokens in the local store.
//   // tokenStore: new StorageTokenStore(sessionStorage, "CustomKey")
// });

export const TIMEOUT_IN_SECONDS = 10;

/** Asset Handling */

export const getAssetById = async (assetId: string) =>
  await singleClient.client.assets.getAsset(assetId);

/** Generic Content Handling */

// export const getContents = async <T>(schema: SCHEMAS | string) =>
// 	(await client.contents.getContents(
// 		schema,
// 		{},
// 		{ timeoutInSeconds: TIMEOUT_IN_SECONDS },
// 	)) as ContentsDto<T>;

export async function getContents<T>(
  schema: SCHEMAS | string
): Promise<ContentsDto<T>> {
  const result = await singleClient.client.contents.getContents(schema, {});
  return result as ContentsDto<T>;
}

export const getContentsByIds = async <T>(
  schema: SCHEMAS | string,
  ids: string
) =>
  (await singleClient.client.contents.getContents(schema, {
    ids,
  })) as ContentsDto<T>;
