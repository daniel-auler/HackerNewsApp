import { useQuery } from '@tanstack/react-query';
import { Animated } from 'react-native';
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

  const onLeftActionStatusChange = (rowKey) => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = (rowKey) => {
    console.log('onLeftAction', rowKey);
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(50);
    return (
      <HiddenItem
        data={data}
        swipeAnimatedValue={rowMap.swipeAnimatedValue}
        rightActionActivated={rowMap.rightActionActivated}
        leftActionActivated={rowMap.leftActionActivated}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
      />
    );
  };

  // const renderItem = (data, rowMap) => {
  //   const rowHeightAnimatedValue = new Animated.Value(50);
  //   return (
  //       <VisibleItem
  //           rowHeightAnimatedValue={rowHeightAnimatedValue}
  //           data={data}
  //           removeRow={() => deleteRow(rowMap, data.item.key)}
  //       />
  //   );
// };

  if (isLoading) return <Spinner size="large" color="$blue10" />;

  return (
    <Main>
      <SwipeListView
        data={articles}
        renderItem={({ item }: { item: Article }) => <ArticleItem item={item} />}
        keyExtractor={(item: Article) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </Main>
  );
};

export default Page;
