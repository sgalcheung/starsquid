import { configService } from "../../configService.js";
import { SquidexClient } from "@squidex/squidex";
import { InMemoryTokenStore } from "@squidex/squidex/dist/wrapper/SquidexClient.js";

type SquidexClientWrapper = {
	client: SquidexClient;
	create: (app: string) => SquidexClient;
};

let singleClient: SquidexClientWrapper | null =
	(globalThis as { __squidexClient?: SquidexClientWrapper }).__squidexClient ??
	null;

export function getClient() {
	console.log("getClient()");
	if (singleClient) {
		console.log("Returning existing SquidexClient instance");
		return singleClient;
	}

	console.log("Initializing new SquidexClient instance");

	const { squidexUrl, squidexAppName, squidexClientId, squidexClientSecret } =
		configService.getConfig();

	singleClient = {
		client: new SquidexClient({
			appName: squidexAppName ?? "",
			clientId: squidexClientId ?? "",
			clientSecret: squidexClientSecret ?? "",
			url: squidexUrl ?? "",
			tokenStore: new InMemoryTokenStore(),
		}),
		create: (app: string) =>
			new SquidexClient({
				appName: app ?? "",
				clientId: squidexClientId ?? "",
				clientSecret: squidexClientSecret ?? "",
				url: squidexUrl ?? "",
				tokenStore: new InMemoryTokenStore(),
			}),
	};

	(globalThis as { __squidexClient?: SquidexClientWrapper }).__squidexClient =
		singleClient;
	return singleClient;
}

// export const TIMEOUT_IN_SECONDS = 10;

/** Asset Handling */

// export const getAssetById = async (assetId: string) =>
//   await singleClient.client.assets.getAsset(assetId);

/** Generic Content Handling */

// export async function getContents<T>(
//   schema: SCHEMAS | string
// ): Promise<ContentsDto<T>> {
//   const result = await singleClient.client.contents.getContents(schema, {});
//   return result as ContentsDto<T>;
// }

// export const getContentsByIds = async <T>(
//   schema: SCHEMAS | string,
//   ids: string
// ) =>
//   (await singleClient.client.contents.getContents(schema, {
//     ids,
//   })) as ContentsDto<T>;
