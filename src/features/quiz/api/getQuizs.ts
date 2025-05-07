import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Quiz, QuizQuery } from '../types';

type QuizsRequest = {
  params?: QuizQuery;
};

type QuizsResponse = {
  data: PaginatedResult<Quiz>;
};

export async function getQuizs({ params }: QuizsRequest) {
  const res = await axios.get<QuizsResponse>(`/quizzes`, { params });

  return res.data.data;
}

type QueryFnType = typeof getQuizs;

type UseQuizsOptions = {
  params?: QuizQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useQuizs({ config, params }: UseQuizsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['quizs', params],
    queryFn: () => getQuizs({ params }),
    placeholderData: keepPreviousData,
  });
}
