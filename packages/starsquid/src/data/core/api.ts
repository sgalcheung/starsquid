
import { SquidexClient } from "@squidex/squidex";
import { InMemoryTokenStore } from "@squidex/squidex/dist/wrapper/SquidexClient.js";


export function SquidexClientFactory(
  squidexAppName: string,
  squidexClientId: string,
  squidexClientSecret: string,
  squidexUrl: string) {
  return new SquidexClient({
    appName: squidexAppName,
    clientId: squidexClientId,
    clientSecret: squidexClientSecret,
    url: squidexUrl,
    tokenStore: new InMemoryTokenStore(),
  })
}
