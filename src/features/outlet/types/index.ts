import { Company } from '@/features/company';
import { Employee } from '@/features/employee';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Outlet = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: boolean;
  company: Company;
} & BaseEntity;

export type OutletDTO = {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  status?: boolean;
  company?: number | string;
};

export type OutletQuery = {
  keyword?: string;
  company?: number | string;
  owner?: number;
  status?: boolean;
} & Pagination;

export type OutletCount = {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
};

export type OutletCountQuery = {
  company?: number;
};

export type OutletEmployee = {
  type: 'admin' | 'employee';
  employee: Employee;
  outlet: Outlet;
} & BaseEntity;

export type OutletEmployeeDTO = {
  type?: string | 'admin' | 'employee';
};

export type OutletEmployeeQuery = {
  type?: 'admin' | 'employee';
  employee?: string | number;
} & Pagination;
