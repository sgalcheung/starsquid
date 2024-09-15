import type { CodegenConfig } from "@graphql-codegen/cli";
// import { EndpointType, getEndpoint } from './src/config';
import "dotenv/config";

function buildUrl(url: string) {
  if (url.length > 0 && url.startsWith("/")) {
    url = url.slice(1);
  }

  const result = `${import.meta.env.SQUIDEX_ENVIRONMENT}/${url}`;

  return result;
}

const GRAPHQL_URI = `api/content/${process.env.SQUIDEX_APP_NAME}/graphql`;

const config: CodegenConfig = {
  require: ["dotenv/config"],
  // schema: getEndpoint(EndpointType.GraphQL),
  schema: buildUrl(GRAPHQL_URI),
  documents: ["src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
  // ignoreNoDocuments: true,
};

export default config;
