/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [
  {
    name: "appDto",
    input: "node_modules/@squidex/squidex/generated/models/AppDto.d.ts",
    output: "./src/generated/appDto.zod.ts",
  },
  {
    name: "resourceLink",
    input: "node_modules/@squidex/squidex/generated/models/ResourceLink.d.ts",
    output: "./src/generated/resourceLink.zod.ts",
  },
  {
    name: "featureDto",
    input: "node_modules/@squidex/squidex/generated/models/FeatureDto.d.ts",
    output: "./src/generated/featureDto.zod.ts",
  },
  {
    name: "featuresDto",
    input: "node_modules/@squidex/squidex/generated/models/FeaturesDto.d.ts",
    output: "./src/generated/featuresDto.zod.ts",
  },
  {
    name: "scheduleJobDto",
    input: "node_modules/@squidex/squidex/generated/models/ScheduleJobDto.d.ts",
    output: "./src/generated/scheduleJobDto.zod.ts",
  },
  {
    name: "contentDto",
    input: "node_modules/@squidex/squidex/generated/models/ContentDto.d.ts",
    output: "./src/generated/contentDto.zod.ts",
  },
  {
    name: "statusInfoDto",
    input: "node_modules/@squidex/squidex/generated/models/StatusInfoDto.d.ts",
    output: "./src/generated/statusInfoDto.zod.ts",
  },
  {
    name: "fieldPropertiesDto",
    input:
      "node_modules/@squidex/squidex/generated/models/FieldPropertiesDto.d.ts",
    output: "./src/generated/fieldPropertiesDto.zod.ts",
  },
  {
    name: "fieldDto",
    input: "node_modules/@squidex/squidex/generated/models/FieldDto.d.ts",
    output: "./src/generated/fieldDto.zod.ts",
  },
  {
    name: "contentsDto",
    input: "node_modules/@squidex/squidex/generated/models/ContentsDto.d.ts",
    output: "./src/generated/contentsDto.zod.ts",
  },
];
