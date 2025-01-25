import { User } from '@/features/user';
import { Metadata, Pagination } from '@/types/api';
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

export type Submission = {
  answer: Answers;
  question: Questions;
  quiz: Quiz;
  user: User;
} & BaseEntity;

export type SubmissionGetAll = {
  metadata: Metadata;
  result: Submission[];
} & BaseEntity;

export type SubmissionFilter = {
  id: number;
  name: string;
  submission: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    question: {
      id: number;
      text: string;
    };
    answer: {
      id: number;
      text: string;
      value: number;
    };
  }[];
};
