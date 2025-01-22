import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export * from './category';
export * from './product';

export type Supplier = {
  name: string;
  description: string;
} & BaseEntity;

export type SupplierDTO = {
  name: string;
  description: string;
  company?: number;
};

export type SupplierQuery = {
  keyword?: string;
  company?: number;
} & Pagination;
