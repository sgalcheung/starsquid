/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    catalogs: import('./scripts/convert').CatalogType;
    column: import('./data/models/Introduction').IntroductionDtoType;
  }
}

interface ImportMetaEnv {
  readonly SQUIDEX_APP_NAME: string;
  readonly SQUIDEX_CLIENT_ID: string;
  readonly SQUIDEX_CLIENT_SECRET: string;
  readonly SQUIDEX_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
