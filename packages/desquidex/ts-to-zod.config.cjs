/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [
  {
    name: "appDto",
    input: "node_modules/@squidex/squidex/generated/models/AppDto.d.ts",
    output: "./generated/appDto.zod.ts",
  },
  {
    name: "resourceLink",
    input: "node_modules/@squidex/squidex/generated/models/ResourceLink.d.ts",
    output: "./generated/resourceLink.zod.ts"
  },
  {
    name: "featureDto",
    input: "node_modules/@squidex/squidex/generated/models/FeatureDto.d.ts",
    output: "./generated/featureDto.zod.ts"
  },
  {
    name: "featuresDto",
    input: "node_modules/@squidex/squidex/generated/models/FeaturesDto.d.ts",
    output: "./generated/featuresDto.zod.ts"
  }
];
