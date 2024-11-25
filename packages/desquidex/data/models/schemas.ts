import { ZodType } from "zod";
import { z } from "astro/zod";
import type {
  ResourceLink,
  AppDto,
  FeatureDto,
  FeaturesDto,
  ScheduleJobDto,
  StatusInfoDto,
  ContentDto,
  ContentsDto,
} from "@squidex/squidex";

export enum SCHEMAS {
  APP = "app",
  FEATURES = "features",
  CONTENT = "content",
}

export const SCHEMAS_CONST = Object.freeze({
  ...SCHEMAS,
} as const);

export type SCHEMAS_VALUES = (typeof SCHEMAS_CONST)[keyof typeof SCHEMAS_CONST];

export const resourceLinkSchema = z.object({
  href: z.string(),
  method: z.string(),
  metadata: z.string().optional().nullable(),
}) satisfies ZodType<ResourceLink>;

export const appDtoSchema = z.object({
  links: z.record(resourceLinkSchema),
  id: z.string(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  version: z.number(),
  created: z.coerce.date(),
  lastModified: z.coerce.date(),
  teamId: z.string().optional().nullable(),
  permissions: z.array(z.string()),
  canAccessApi: z.boolean(),
  canAccessContent: z.boolean(),
  roleName: z.string().optional().nullable(),
  roleProperties: z.record(z.any()),
}) satisfies ZodType<AppDto>;

export const featureDtoSchema = z.object({
  name: z.string(),
  text: z.string(),
}) satisfies ZodType<FeatureDto>;

export const featuresDtoSchema = z.object({
  features: z.array(featureDtoSchema),
  version: z.number(),
}) satisfies ZodType<FeaturesDto>;

// export type FeaturesDocument = z.infer<typeof featuresDtoSchema>;

export const scheduleJobDtoSchema = z.object({
  id: z.string(),
  status: z.string(),
  dueTime: z.coerce.date(),
  color: z.string(),
  scheduledBy: z.string(),
}) satisfies ZodType<ScheduleJobDto>;

export const statusInfoDtoSchema = z.object({
  status: z.string(),
  color: z.string(),
}) satisfies ZodType<StatusInfoDto>;

const fieldPropertiesDtoSchema = z.object({
  label: z.string().optional().nullable(),
  hints: z.string().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  isRequired: z.boolean().optional(),
  isRequiredOnPublish: z.boolean().optional(),
  isHalfWidth: z.boolean().optional(),
  editorUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  fieldType: z.string(),
});

const nestedFieldDtoSchema = z.any().optional();

const fieldDtoSchema = z.object({
  links: z.record(resourceLinkSchema),
  fieldId: z.number(),
  name: z.string(),
  isHidden: z.boolean(),
  isLocked: z.boolean(),
  isDisabled: z.boolean(),
  partitioning: z.string(),
  properties: fieldPropertiesDtoSchema,
  nested: z.array(nestedFieldDtoSchema).optional().nullable(),
});

export const dataSchema = z.record(
  z.string(),
  z.object({
    iv: z.union([z.string(), z.array(z.unknown())]),
  })
);

export const contentDtoSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    links: z.record(resourceLinkSchema),
    id: z.string(),
    createdBy: z.string(),
    lastModifiedBy: z.string(),
    data: schema,
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
//satisfies ZodType<ContentDto>;

export const contentsDtoSchema = <T>(schema: z.ZodType<T, any, any>) =>
  z.object({
    links: z.record(resourceLinkSchema),
    total: z.number(),
    items: z.array(contentDtoSchema(schema)),
    statuses: z.array(statusInfoDtoSchema),
  });
//satisfies ZodType<ContentsDto>;
