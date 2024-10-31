import type { ContentDto } from "./ContentDtoT";
import type { ContentsDto as SquidexContentsDto } from "@squidex/squidex";

export interface ContentsDto<T> extends SquidexContentsDto {
  /** The generic content items. */
  items: ContentDto<T>[];
}
