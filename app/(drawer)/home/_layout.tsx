import { useQuery } from '@tanstack/react-query';
import { RefreshControl } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Spinner } from 'tamagui';

import ArticleItem from '~/components/ArticleItem/ArticleItem';
import { HiddenItem } from '~/components/ArticleItem/HiddenItem';
import { getArticles } from '~/services/api';
import { Main } from '~/tamagui.config';
import { Article } from '~/types/article';

const Page: React.FC = () => {
  const {
    data: articles,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  if (isLoading) return <Spinner size="large" color="$blue10" />;

  return (
    <Main>
      <SwipeListView
        disableRightSwipe
        data={articles}
        renderItem={({ item }: { item: Article }) => <ArticleItem item={item} />}
        keyExtractor={(item: Article) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        renderHiddenItem={(data) => <HiddenItem item={data.item} hasDeleteAction />}
        rightOpenValue={-150}
        previewOpenDelay={3000}
      />
    </Main>
  );
};
export default Page;
