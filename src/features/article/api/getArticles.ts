import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Metadata } from '@/types/api';

import { Article } from '../types';

// import { Article, ArticleQuery } from '../../types';

type ArticlesRearticle = {
  params?: any;
};

export type PaginatedResult<T> = {
  data: {
    metadata: Metadata;
    result: T[];
  };
};

export async function getArticles({ params }: ArticlesRearticle) {
  const res = await axios.get<PaginatedResult<Article>>(`/articles`, {
    params,
  });

  return res.data.data;
}

type QueryFnType = typeof getArticles;

type UseArticlesOptions = {
  // params?: ArticleQuery;
  params?: any;
  config?: QueryConfig<QueryFnType>;
};

export function useArticles({ config, params }: UseArticlesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['articles', params],
    queryFn: () => getArticles({ params }),
    placeholderData: keepPreviousData,
  });
}
