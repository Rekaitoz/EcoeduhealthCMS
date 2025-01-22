import { User } from '@/features/user';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Employee = {
  name: string;
  phonenumber: string;
  address: string;
  user: User;
  status: boolean;
} & BaseEntity;

export type EmployeeDTO = {
  username?: string;
  password?: string;
  name?: string;
  phonenumber?: string;
  address?: string;
  status?: boolean;
};

export type EmployeeQuery = {
  keyword?: string;
} & Pagination;
