/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [
  {
    name: "appDto",
    input: "node_modules/@squidex/squidex/generated/models/AppDto.d.ts",
    output: "./src/__generated__/appDto.zod.ts",
  },
  {
    name: "resourceLink",
    input: "node_modules/@squidex/squidex/generated/models/ResourceLink.d.ts",
    output: "./src/__generated__/resourceLink.zod.ts",
  },
  {
    name: "featureDto",
    input: "node_modules/@squidex/squidex/generated/models/FeatureDto.d.ts",
    output: "./src/__generated__/featureDto.zod.ts",
  },
  {
    name: "featuresDto",
    input: "node_modules/@squidex/squidex/generated/models/FeaturesDto.d.ts",
    output: "./src/__generated__/featuresDto.zod.ts",
  },
  {
    name: "scheduleJobDto",
    input: "node_modules/@squidex/squidex/generated/models/ScheduleJobDto.d.ts",
    output: "./src/__generated__/scheduleJobDto.zod.ts",
  },
  {
    name: "contentDto",
    input: "node_modules/@squidex/squidex/generated/models/ContentDto.d.ts",
    output: "./src/__generated__/contentDto.zod.ts",
  },
  {
    name: "statusInfoDto",
    input: "node_modules/@squidex/squidex/generated/models/StatusInfoDto.d.ts",
    output: "./src/__generated__/statusInfoDto.zod.ts",
  },
  {
    name: "fieldPropertiesDto",
    input:
      "node_modules/@squidex/squidex/generated/models/FieldPropertiesDto.d.ts",
    output: "./src/__generated__/fieldPropertiesDto.zod.ts",
  },
  {
    name: "fieldDto",
    input: "node_modules/@squidex/squidex/generated/models/FieldDto.d.ts",
    output: "./src/__generated__/fieldDto.zod.ts",
  },
  {
    name: "contentsDto",
    input: "node_modules/@squidex/squidex/generated/models/ContentsDto.d.ts",
    output: "./src/__generated__/contentsDto.zod.ts",
  },
];
