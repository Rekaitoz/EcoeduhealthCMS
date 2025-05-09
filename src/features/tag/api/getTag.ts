import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { TagType, TagQuery } from '../types';

type TagsRequest = {
  params?: TagQuery;
};

type TagsResponse = {
  data: PaginatedResult<TagType>;
};

export async function getTags({ params }: TagsRequest) {
  const res = await axios.get<TagsResponse>(`/tags`, { params });

  return res.data.data;
}

type QueryFnType = typeof getTags;

type UseTagsOptions = {
  params?: TagQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useTags({ config, params }: UseTagsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tags', params],
    queryFn: () => getTags({ params }),
    placeholderData: keepPreviousData,
  });
}
