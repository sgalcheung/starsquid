import { test as baseTest, describe, expect, it } from 'vitest'
import { SquidexClientFactory } from '../src/data/core/api';

process.setSourceMapsEnabled(true);

const squidexAppName = process.env.SQUIDEX_APP_NAME;
const squidexClientId = process.env.SQUIDEX_CLIENT_ID;
const squidexClientSecret = process.env.SQUIDEX_CLIENT_SECRET;
const squidexUrl = process.env.SQUIDEX_URL;

interface Context {
  client: ReturnType<typeof SquidexClientFactory>
}

export const test = baseTest.extend<Context>({
  client: async (
    // biome-ignore lint/correctness/noEmptyPattern: Vitest setup requires empty pattern
    { },
    use
  ) => {
    if (!squidexUrl || !squidexClientId || !squidexClientSecret || !squidexAppName) {
      throw new Error(
        `Missing Squidex configuration. Please set the following environment variables: 
        ${!squidexUrl ? "SQUIDEX_URL, " : ""}${!squidexClientId ? "SQUIDEX_CLIENT_ID, " : ""}${!squidexClientSecret ? "SQUIDEX_CLIENT_SECRET, " : ""}${!squidexAppName ? "SQUIDEX_APP_NAME" : ""}`.replace(/, $/, ".")
      );
    }

    // setup the fixture before each test function
    const squidexClient = SquidexClientFactory(
      squidexAppName,
      squidexClientId,
      squidexClientSecret,
      squidexUrl
    );

    // use the fixture value
    await use(squidexClient)

    // cleanup the fixture after each test function
  }
})

export { describe, expect };
