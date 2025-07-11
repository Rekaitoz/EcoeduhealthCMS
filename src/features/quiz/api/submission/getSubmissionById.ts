import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Submission } from '../../types';

type SubmissionByIdRequest = {
  id: number;
};

export async function getSubmissionById({ id }: SubmissionByIdRequest) {
  const res = await axios.get<{ data: Submission }>(`/submissions/${id}`);

  return res.data.data;
}

type QueryFnType = typeof getSubmissionById;

type UseSubmissionByIdOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useSubmissionById({ config, id }: UseSubmissionByIdOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['submissionById', id],
    queryFn: () => getSubmissionById({ id }),
  });
}
