import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Quiz } from '../types';

type QuizRequest = {
  id: number | string;
};

export async function getQuizById({ id }: QuizRequest) {
  const res = await axios.get<Quiz>(`/quiz/${id}`);

  return res.data;
}

type QueryFnType = typeof getQuizById;

type UseQuizOptions = {
  id: number | string;
  config?: QueryConfig<QueryFnType>;
};

export function useQuizById({ config, id }: UseQuizOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['quizById', id],
    queryFn: () => getQuizById({ id }),
  });
}
