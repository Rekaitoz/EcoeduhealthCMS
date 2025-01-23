import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Quiz, QuizDTO } from '../types';

type QuizUpdateRequest = {
  id: number;
  data: QuizDTO;
};

export async function updateQuiz({ id, data }: QuizUpdateRequest) {
  const res = await axios.put<GeneralResponse<Quiz>>(`/quiz/${id}`, data);

  return res.data;
}

type UseUpdateQuizOptions = {
  config?: MutationConfig<typeof updateQuiz>;
};

export function useUpdateQuiz({ config }: UseUpdateQuizOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateQuiz,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['quizs'] });
      queryClient.invalidateQueries({ queryKey: ['quiz'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
