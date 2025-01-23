import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Questions, QuestionsDTO } from '../types';

type QuestionsCreateRequest = {
  data: QuestionsDTO | { quiz: number };
};

export async function createQuestions({ data }: QuestionsCreateRequest) {
  const res = await axios.post<GeneralResponse<Questions>>(`/question`, data);

  return res.data;
}

type UseCreateQuestionsOptions = {
  config?: MutationConfig<typeof createQuestions>;
};

export function useCreateQuestions({ config }: UseCreateQuestionsOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createQuestions,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['quizById'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
