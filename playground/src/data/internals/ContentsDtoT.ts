import type { ContentDto } from './ContentDtoT';
import type { ContentsDto as SquidexContentsDto } from 'starsquid/squidex';

export interface ContentsDto<T> extends SquidexContentsDto {
  items: Array<ContentDto<T>>;
}
