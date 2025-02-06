import type { AstroIntegration } from "astro";
import { validateRequest } from "./signatureUtils.js";

/**
 * Notice!!! The production environment is not supported.
 * This API(refreshContent) is for dev only and is not supported in Astro 5.
 * Astro may support live content updates in production one day, but the API would be different.
 * reference: https://answers.netlify.com/t/netlify-dont-work-for-my-astro-middleware-endpoint/129673/11
 * @param webhookSecret
 * @returns
 */
export function refreshContentIntegration(
	webhookSecret: string,
): AstroIntegration {
	return {
		name: "desquidex/refresh-content",
		hooks: {
			"astro:server:setup": async ({ server, refreshContent }) => {
				// `server` is the Vite dev server instance
				server.middlewares.use("/_refresh", async (req, res) => {
					if (req.method !== "POST") {
						res.statusCode = 405;
						res.end("Method Not Allowed");
						return;
					}
					let body = "";
					req.on("data", (chunk) => {
						body += chunk.toString();
					});
					req.on("end", async () => {
						// check signature
						const isValid = validateRequest(req.headers, body, webhookSecret);

						if (!isValid) {
							res.statusCode = 401;
							res.end("Invalid signature");
							return;
						}

						// Process the valid request
						// console.log("Valid webhook payload:", body);

						try {
							const webhookBody = JSON.parse(body);
							const schemaId = webhookBody.payload.schemaId;
							const name = schemaId.split(",")[1];
							await refreshContent?.({
								// The context can be any arbitrary object. We're calling it `webhookBody` here, but it could be anything.
								context: { webhookBody }, // if need to return body content or trig
								// Only refresh collections that use the `desquidex-${name}` loader
								loaders: [`desquidex-${name}`],
							});
							res.writeHead(200, { "Content-Type": "application/json" });
							res.end(
								JSON.stringify({
									message: "Content refreshed successfully",
								}),
							);
						} catch (error) {
							res.writeHead(500, { "Content-Type": "application/json" });
							res.end(
								JSON.stringify({
									error: `Failed to refresh content: ${(error as Error).message}`,
								}),
							);
						}
					});
				});
			},
		},
	};
}
