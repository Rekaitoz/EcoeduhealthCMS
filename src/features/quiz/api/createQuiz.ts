import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Quiz, QuizDTO } from '../types';

type QuizCreateRequest = {
  data: QuizDTO;
};

export async function createQuiz({ data }: QuizCreateRequest) {
  const res = await axios.post<GeneralResponse<Quiz>>(`/quizzes`, data);

  return res.data;
}

type UseCreateQuizOptions = {
  config?: MutationConfig<typeof createQuiz>;
};

export function useCreateQuiz({ config }: UseCreateQuizOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createQuiz,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['quizs'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
