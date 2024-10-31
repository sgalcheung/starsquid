import type { ContentDto as SquidexContentDto } from "@squidex/squidex";

export interface ContentDto<T> extends SquidexContentDto {
    data: T;
}