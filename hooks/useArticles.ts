import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMMKVString } from 'react-native-mmkv';

import { fetchWithPrevious } from '~/services/api';
import { Article } from '~/types/article';

export const useArticles = () => {
  const [selectedPlatform] = useMMKVString('selectedPlatform');
  const queryClient = useQueryClient();
  const previousArticles = queryClient.getQueryData<Article[]>(['articles']);

  // TODO: Infinite query
  // return useInfiniteQuery({
  //   queryKey: ['articles'],
  //   queryFn: ({ pageParam }) =>
  //     fetchWithPrevious({
  //       previous: previousArticles,
  //       subject: selectedPlatform,
  //       pageParam,
  //     }),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => {
  //     // 20 is the default page size

  //     if (lastPage.data.length < 20) return undefined;
  //     return lastPage.nextPage;
  //   },
  // });
  return useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      fetchWithPrevious({
        previous: previousArticles,
        subject: selectedPlatform,
        pageParam: 0,
      }),
  });
};
