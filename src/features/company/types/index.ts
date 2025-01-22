import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Company = {
  name: string;
  region: string;
} & BaseEntity;

export type CompanyDTO = {
  name: string;
  region: string;
};

export type CompanyQuery = Pagination;
