import type { ContentDto as SquidexContentDto } from 'starsquid/squidex';

export interface ContentDto<T> extends SquidexContentDto {
	data: T;
}
