import { RefreshControl } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Spinner } from 'tamagui';

import ArticleItem from '~/components/ArticleItem';
import { HiddenItem } from '~/components/HiddenItem';
import { useArticles } from '~/hooks/useArticles';
import { Main } from '~/tamagui.config';
import { Article } from '~/types/article';

const Page: React.FC = () => {
  const { data, isLoading, refetch } = useArticles();

  // TODO: infinity scroll
  // const loadNext = () => {
  //   if (hasNextPage) {
  //     fetchNextPage();
  //   }
  // };
  
  // const flattenData = useMemo(() => {
  //   return data?.pages.reduce((acc, page) => {
  //     return [...acc, ...page];
  //   }, []);
  // }, [data]);

  if (isLoading) return <Spinner size="large" color="$blue10" />;

  return (
    <Main>
      <SwipeListView
        disableRightSwipe
        data={data}
        renderItem={({ item }: { item: Article }) => <ArticleItem item={item} />}
        keyExtractor={(item: Article) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        renderHiddenItem={(data) => <HiddenItem item={data.item} hasDeleteAction />}
        rightOpenValue={-150}
        previewOpenDelay={3000}
        // onEndReached={loadNext}
        onEndReachedThreshold={0.2}
      />
    </Main>
  );
};
export default Page;
