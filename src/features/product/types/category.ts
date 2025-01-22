import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Category = {
  name: string;
  description: string;
} & BaseEntity;

export type CategoryDTO = {
  name?: string;
  description?: string;
};

export type CategoryQuery = {
  keyword?: string;
} & Pagination;
