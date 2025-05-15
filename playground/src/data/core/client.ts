import type { ContentDto } from '../internals/ContentDtoT';
import type { ContentsDto } from '../internals/ContentsDtoT';
import type { SCHEMAS } from '../models/schemas';
import { SquidexClientFactory } from "starsquid/api";

export const squidexClient = SquidexClientFactory(
  import.meta.env.SQUIDEX_APP_NAME,
  import.meta.env.SQUIDEX_CLIENT_ID,
  import.meta.env.SQUIDEX_CLIENT_SECRET,
  import.meta.env.SQUIDEX_URL
);

// export const TIMEOUT_IN_SECONDS = 10;

/** Asset Handling */

export const getAssetById = async (assetId: string) => await squidexClient.assets.getAsset(assetId);

/** Generic Content Handling */

export const getContents = async <T>(schema: SCHEMAS | string) =>
  (await squidexClient.contents.getContents(schema)) as ContentsDto<T>;

// Same effect, different writing
// export async function getContents<T>(schema: SCHEMAS | string): Promise<ContentsDto<T>> {
// 	const result = await client.contents.getContents(schema, {});
// 	return result as ContentsDto<T>;
// }

export const getContentById = async <T>(schema: SCHEMAS | string, id: string) =>
  (await squidexClient.contents.getContent(schema, id)) as ContentDto<T>;

export const getContentsByIds = async <T>(schema: SCHEMAS | string, ids: string) =>
  (await squidexClient.contents.getContents(schema, { ids })) as ContentsDto<T>;

export async function getReferences<T extends object>(schema: SCHEMAS | string, id: string): Promise<ContentsDto<T>> {
  const fieldArray = Object.keys({} as T);
  const fields = fieldArray.join(",");
  const references = await squidexClient.contents.getReferences(schema, id, { fields });
  return references as ContentsDto<T>
}

export async function getReferencing<T extends object>(schema: SCHEMAS | string, id: string): Promise<ContentsDto<T>> {
  const fieldArray = Object.keys({} as T);
  const fields = fieldArray.join(",");
  const referencing = await squidexClient.contents.getReferencing(schema, id, { fields });
  return referencing as ContentsDto<T>
}

