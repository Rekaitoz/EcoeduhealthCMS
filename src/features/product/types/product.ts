import { Company } from '@/features/company';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

import { Category } from './category';

export type Ingredient = {
  quantity: number;
  base: Product;
  ingredient: Product;
};

export type Product = {
  name: string;
  description: string;
  price: number;
  unit: string;
  type: 'purchase' | 'sale';
  category?: Category;
  company?: Company;
  isDefault: boolean;
  ingredients: Ingredient[];
} & BaseEntity;

export type ProductDTO = {
  name?: string;
  description?: string;
  price?: number;
  unit?: string;
  company?: number;
  isDefault?: boolean;
  type?: 'purchase' | 'sale';
  category?: number;
  ingredients?: {
    product?: number;
    quantity?: number;
  }[];
};

export type ProductQuery = {
  keyword?: string;
  category?: number;
  company?: number;
  type?: 'purchase' | 'sale';
} & Pagination;
