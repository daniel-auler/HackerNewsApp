import { useMMKVObject } from 'react-native-mmkv';
import { ScrollView } from 'tamagui';

import ArticleItem from '~/components/ArticleItem/ArticleItem';
import { Container, Main, Title } from '~/tamagui.config';
import { Article } from '~/types/article';

const Page: React.FC = () => {
  const [favorites] = useMMKVObject<Article[]>('favorites');

  return (
    <Main>
      {(!favorites || favorites?.length === 0) && (
        <Container>
          <Title>No favorites yet</Title>
        </Container>
      )}
      <ScrollView>{favorites?.map((fav) => <ArticleItem key={fav.id} item={fav} />)}</ScrollView>
    </Main>
  );
};

export default Page;
