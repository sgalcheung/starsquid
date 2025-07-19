# starsquid

## 1.1.3

### Patch Changes

- [#6](https://github.com/sgalcheung/starsquid/pull/6) [`ca494e6`](https://github.com/sgalcheung/starsquid/commit/ca494e67a13aac4412bb72c48125dd61f5c6844b) Thanks [@sgalcheung](https://github.com/sgalcheung)! - Support RenderMarkdown API

## 1.1.2

### Patch Changes

- [`04060c4`](https://github.com/sgalcheung/starsquid/commit/04060c47c055f5565a0ca904eae14862154ae9bd) Thanks [@sgalcheung](https://github.com/sgalcheung)! - Merge [Refactor loader schema #2](https://github.com/sgalcheung/starsquid/pull/2).

## 1.1.1

### Patch Changes

- include additional files in package.json for improved distribution.
  fix commit(41ef8dd15f00ceb98f680f2bd71c7cbd9f1bc9d4): add squidex module exports for improved integration

## 1.1.0

### Minor Changes

- feat: add squidex module exports for improved integration.

  No need to define schema manually, get the fields contained in the corresponding schema through the getSchema API of Schemas.

## 1.0.1

### Patch Changes

- Simplify squidexCollections parameters and enhance error handling.
  The Vite client library could directly use the Vite variable.

## 1.0.0

### Major Changes

- Officially released version v1, renamed desquidex to starsquid.

## 0.3.0

### Minor Changes

- Refactor the call to SquidexClient to implement a singleton.

## 0.2.3

### Patch Changes

- - Update output paths in ts-to-zod configuration to remove src prefix and add nestedFieldDto.
  - Enhance schema definitions and loader logic for improved data handling.

## 0.2.2

### Patch Changes

- Update Config interface and ConfigService class for improved type handling
  Change import z from "astro/zod" to "astro:content"

## 0.2.1

### Patch Changes

- Add document.

## 0.2.0

### Minor Changes

- Export a singleton instance of SquidexClient.

## 0.1.6

### Patch Changes

- - Improve error handling in makeLoader by including detailed parsing error message
  - Refactor makeLoader to use safeParseAsync for asynchronous content validation
  - Fix contentdto schema parsed bug.

## 0.1.5

### Patch Changes

- Used biome to lint and format.

## 0.1.4

### Patch Changes

- Update README.md.

## 0.1.3

### Patch Changes

- Upgrade to Astro 5.1.1 for fix bug [#2716](https://github.com/withastro/starlight/issues/2716).

## 0.1.2

### Patch Changes

- Upgrade to Astro 5.0.

## 0.1.1

### Patch Changes

- Support webhooks to refresh content. (Notice!!! The production environment is not supported, [see more](https://answers.netlify.com/t/netlify-dont-work-for-my-astro-middleware-endpoint/129673/11))

## 0.1.0

### Minor Changes

- Refactored according to the [astro-integration-template](https://github.com/florian-lefebvre/astro-integration-template) specification.
