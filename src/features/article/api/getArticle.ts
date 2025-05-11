import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

// import { Article } from '../../types';

type ArticleRearticle = {
  slug: string;
};

export async function getArticle({ slug }: ArticleRearticle) {
  const res = await axios.get<any>(`/articles/${slug}`);

  return res.data;
}

type QueryFnType = typeof getArticle;

type UseArticleOptions = {
  slug: string;
  config?: QueryConfig<QueryFnType>;
};

export function useArticle({ config, slug }: UseArticleOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['article', slug],
    queryFn: () => getArticle({ slug }),
  });
}
