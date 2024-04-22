import { useMMKVObject } from 'react-native-mmkv';
import { ScrollView, Text } from 'tamagui';

import ArticleItem from '~/components/ArticleItem/ArticleItem';
import { Main } from '~/tamagui.config';
import { Article } from '~/types/article';

const Page: React.FC = () => {
  const [favorites] = useMMKVObject<Article[]>('favorites');
  console.log(favorites);

  return (
    <Main>
      {(!favorites || favorites?.length === 0) && <Text>No favorites yet</Text>}
      <ScrollView>{favorites?.map((fav) => <ArticleItem key={fav.id} item={fav} />)}</ScrollView>
    </Main>
  );
};

export default Page;
