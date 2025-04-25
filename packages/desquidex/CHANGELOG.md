# desquidex

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
