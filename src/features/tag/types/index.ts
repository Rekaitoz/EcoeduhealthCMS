import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type TagType = {
  name: string;
  description: string;
  parentId?: number;
  slug?: string;
} & BaseEntity;

export type TagDTO = {
  name: string;
  description: string;
  parentId?: number;
  slug?: string;
};

export type TagQuery = {
  keyword?: string;
} & Pagination;
