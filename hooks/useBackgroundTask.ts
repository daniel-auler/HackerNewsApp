import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { useMMKVString } from 'react-native-mmkv';

import { fetchWithPrevious } from '~/services/api';
import { Article } from '~/types/article';

export const useBackgroundTask = () => {
  const [selectedPlatform] = useMMKVString('selectedPlatform');
  const queryClient = useQueryClient();
  const previousArticles = queryClient.getQueryData<Article[]>(['articles']);

  const { refetch } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetchWithPrevious({
        previous: previousArticles,
        subject: selectedPlatform,
        pageParam: 0,
      }),
  });

  const configure = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
      },
      async (taskId) => {
        console.log('Received background-fetch event: ', taskId);

        await refetch();
        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.error('RNBackgroundFetch failed to start.', error);
      }
    );
  };

  useEffect(() => {
    configure();
  }, []);
};
