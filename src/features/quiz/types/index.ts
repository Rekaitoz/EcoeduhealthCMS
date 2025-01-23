import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Quiz = {
  name: string;
  description: string;
  questions?: Questions[];
} & BaseEntity;

export type Questions = {
  text: string;
  answers?: Answers[];
} & BaseEntity;

export type Answers = {
  text: string;
  value: number;
} & BaseEntity;

export type QuizDTO = {
  name: string;
  description: string;
  questions?: QuestionsDTO[];
};

export type QuestionsDTO = {
  text: string;
  answers?: AnswersDTO[];
};

export type AnswersDTO = {
  text: string;
  value: number;
};

export type QuizQuery = {
  keyword?: string;
} & Pagination;
