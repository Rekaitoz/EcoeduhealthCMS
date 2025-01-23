import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Questions, QuestionsDTO } from '../../types';

type QuestionsUpdateRequest = {
  id: number;
  data: QuestionsDTO | { quiz: number };
};

export async function updateQuestions({ id, data }: QuestionsUpdateRequest) {
  const res = await axios.put<GeneralResponse<Questions>>(`/question/${id}`, data);

  return res.data;
}

type UseUpdateQuestionsOptions = {
  config?: MutationConfig<typeof updateQuestions>;
};

export function useUpdateQuestions({ config }: UseUpdateQuestionsOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateQuestions,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['quizById'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
