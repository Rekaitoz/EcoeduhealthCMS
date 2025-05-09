import { CategoryType } from '@/features/category';
import { TagType } from '@/features/tag';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Article = {
  title: string;
  content: string;
  slug?: string;
  publishedAt?: Date;
  categories: CategoryType[];
  tags: TagType[];
} & BaseEntity;

export type ArticleDTO = {
  title: string;
  content: string;
  slug?: string;
  publishedAt?: Date;
  categories: string[];
  tags: string[];
};

export type ArticleQuery = {
  keyword?: string;
} & Pagination;
