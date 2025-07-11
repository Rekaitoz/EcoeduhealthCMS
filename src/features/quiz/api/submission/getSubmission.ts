import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { QuizQuery, SubmissionGetAll } from '../../types';

type SubmissionRequest = {
  params?: QuizQuery;
};

export async function getSubmission({ params }: SubmissionRequest) {
  const res = await axios.get<{ data: SubmissionGetAll }>(`/submissions`, { params });
  return res.data.data;
}

type QueryFnType = typeof getSubmission;

type UseSubmissionOptions = {
  params: QuizQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useSubmission({ config, params }: UseSubmissionOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['submission', params],
    queryFn: () => getSubmission({ params }),
  });
}
