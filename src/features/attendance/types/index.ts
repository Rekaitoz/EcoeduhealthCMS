import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Shift = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
} & BaseEntity;

export type ShiftRequest = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  company: number;
};

export type ShiftQuery = {
  company?: number;
} & Pagination;
