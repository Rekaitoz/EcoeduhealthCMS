import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Quiz } from '../types';

type QuizRequest = {
  id: number;
};

export async function getQuiz({ id }: QuizRequest) {
  const res = await axios.get<Quiz>(`/quiz/${id}`);

  return res.data;
}

type QueryFnType = typeof getQuiz;

type UseQuizOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useQuiz({ config, id }: UseQuizOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['quiz', id],
    queryFn: () => getQuiz({ id }),
  });
}
