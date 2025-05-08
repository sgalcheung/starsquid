/**
 * Reference
 * https://github.com/Xetera/xetera.dev/blob/master/src/scripts/graphql.ts
 */

import type { ExecutionResult } from "graphql";
import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export async function executeOperation<TResult, TVariables>(
	url: string,
	operation: TypedDocumentNode<TResult, TVariables>,
	variables?: TVariables,
): Promise<ExecutionResult<TResult>> {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: print(operation),
				variables: variables ?? null, // 处理 undefined 和 null
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
}

// biome-ignore lint/style/noNonNullAssertion: Always defined This environment variable is guaranteed to be set
export const GRAPHQL_URL = process.env.SQUIDEX_GRAPHQL_URL!;
