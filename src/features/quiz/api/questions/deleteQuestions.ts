import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Questions } from '../../types';

type QuestionsDeleteRequest = {
  id: number;
};

export async function deleteQuestions({ id }: QuestionsDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Questions>>(`/question/${id}`);

  return res.data;
}

type UseDeleteQuestionsOptions = {
  config?: MutationConfig<typeof deleteQuestions>;
};

export function useDeleteQuestions({ config }: UseDeleteQuestionsOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteQuestions,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['quizById'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
