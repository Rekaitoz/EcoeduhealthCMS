import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type CategoryType = {
  name: string;
  description: string;
  parentId?: number;
  slug?: string;
} & BaseEntity;

export type CategoryDTO = {
  name: string;
  description: string;
  parentId?: number;
  slug?: string;
};

export type CategoryQuery = {
  keyword?: string;
} & Pagination;
