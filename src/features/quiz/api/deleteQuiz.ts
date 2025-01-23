import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Quiz } from '../types';

type QuizDeleteRequest = {
  id: number;
};

export async function deleteQuiz({ id }: QuizDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Quiz>>(`/quiz/${id}`);

  return res.data;
}

type UseDeleteQuizOptions = {
  config?: MutationConfig<typeof deleteQuiz>;
};

export function useDeleteQuiz({ config }: UseDeleteQuizOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteQuiz,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['quizs'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
