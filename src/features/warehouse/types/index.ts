import { Company } from '@/features/company';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Warehouse = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
  company: Company;
} & BaseEntity;

export type WarehouseRequest = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
  company: number;
};

export type WarehouseQuery = {
  keyword?: string;
  company?: number;
} & Pagination;
