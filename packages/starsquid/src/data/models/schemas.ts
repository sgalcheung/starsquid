import { z, type ZodTypeAny } from "astro/zod";
import type {
  AppDto,
  FeatureDto,
  FeaturesDto,
  FieldDto,
  FieldPropertiesDto,
  NestedFieldDto,
  ResourceLink,
  ScheduleJobDto,
  StatusInfoDto,
} from "@squidex/squidex";

export enum SCHEMAS {
  CONTENT = "content",
}

export const SCHEMAS_CONST = Object.freeze({
  ...SCHEMAS,
} as const);

export type SCHEMAS_VALUES = (typeof SCHEMAS_CONST)[keyof typeof SCHEMAS_CONST];

export const resourceLinkSchema = z.object({
  href: z.string(),
  method: z.string(),
  metadata: z.string().nullable(),
}) satisfies z.ZodType<ResourceLink>;

export const appDtoSchema = z.object({
  links: z.record(z.string(), resourceLinkSchema),
  id: z.string(),
  name: z.string(),
  label: z.string().nullable(),
  description: z.string().nullable(),
  version: z.number(),
  created: z.coerce.date(),
  lastModified: z.coerce.date(),
  teamId: z.string().nullable(),
  permissions: z.array(z.string()),
  canAccessApi: z.boolean(),
  canAccessContent: z.boolean(),
  roleName: z.string().nullable(),
  roleProperties: z.record(z.any()),
}) satisfies z.ZodType<AppDto>;

export const featureDtoSchema = z.object({
  name: z.string(),
  text: z.string(),
}) satisfies z.ZodType<FeatureDto>;

export const featuresDtoSchema = z.object({
  features: z.array(featureDtoSchema),
  version: z.number(),
}) satisfies z.ZodType<FeaturesDto>;

export const scheduleJobDtoSchema = z.object({
  id: z.string(),
  status: z.string(),
  dueTime: z.coerce.date(),
  color: z.string(),
  scheduledBy: z.string(),
}) satisfies z.ZodType<ScheduleJobDto>;

export const statusInfoDtoSchema = z.object({
  status: z.string(),
  color: z.string(),
}) satisfies z.ZodType<StatusInfoDto>;

const fieldPropertiesDtoSchema = z.object({
  label: z.string().nullable(),
  hints: z.string().nullable(),
  placeholder: z.string().nullable(),
  isRequired: z.boolean(),
  isRequiredOnPublish: z.boolean(),
  isHalfWidth: z.boolean(),
  editorUrl: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  fieldType: z.string(),
}) satisfies z.ZodType<FieldPropertiesDto>;

const nestedFieldDtoSchema = z.object({
  links: z.record(resourceLinkSchema),
  fieldId: z.number(),
  name: z.string(),
  isHidden: z.boolean(),
  isLocked: z.boolean(),
  isDisabled: z.boolean(),
  properties: fieldPropertiesDtoSchema,
}) satisfies z.ZodType<NestedFieldDto>;

const fieldDtoSchema = z.object({
  links: z.record(z.string(), resourceLinkSchema),
  fieldId: z.number(),
  name: z.string(),
  isHidden: z.boolean(),
  isLocked: z.boolean(),
  isDisabled: z.boolean(),
  partitioning: z.string(),
  properties: fieldPropertiesDtoSchema,
  nested: z.array(nestedFieldDtoSchema).nullable(),
}) satisfies z.ZodType<FieldDto>;

export const contentDtoSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    links: z.record(z.string(), resourceLinkSchema),
    id: z.string(),
    createdBy: z.string(),
    lastModifiedBy: z.string(),
    data: schema.nullable(),
    referenceData: z.record(z.record(z.any())).optional(),
    created: z.coerce.date(),
    lastModified: z.coerce.date(),
    status: z.string(),
    newStatus: z.string().optional().nullable(),
    statusColor: z.string(),
    newStatusColor: z.string().optional().nullable(),
    editToken: z.string().optional().nullable(),
    scheduleJob: scheduleJobDtoSchema.optional(),
    schemaId: z.string(),
    schemaName: z.string().optional().nullable(),
    schemaDisplayName: z.string().optional().nullable(),
    referenceFields: z.array(fieldDtoSchema).optional().nullable(),
    isDeleted: z.boolean(),
    version: z.number(),
  });
//satisfies z.ZodType<ContentDto>;

// Helper type to infer the content DTO schema for a specific data type
export type ContentDtoType<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof contentDtoSchema<T>>>;

/**
 * A schema for a collection of content items.
 * The generic type `T` represents the shape of the data schema for individual content items.
 */
// Temporarily disable the export or remove if unused
export const contentsDtoSchema = <T>(
  schema: z.ZodType<T, z.ZodTypeDef, unknown>,
) =>
  z.object({
    links: z.record(z.string(), resourceLinkSchema),
    total: z.number(),
    items: z.array(contentDtoSchema(schema)),
    statuses: z.array(statusInfoDtoSchema),
  });
//satisfies z.ZodType<ContentsDto>;

export type ContentsDtoType<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof contentsDtoSchema<T>>>;




export enum SYSTEM_SCHEMAS {
  APP = "app",
  NEWS = "news",
}

export const SYSTEM_SCHEMAS_Map = new Map<string, ZodTypeAny>([
  [SYSTEM_SCHEMAS.APP, appDtoSchema],
  [SYSTEM_SCHEMAS.NEWS, featuresDtoSchema],
]);
