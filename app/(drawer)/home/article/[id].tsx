import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { Article } from '~/types/article';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Article[]>(['articles']);
  const article = data?.find((article: Article) => Number(article.id) === Number(id));

  return <WebView style={styles.container} source={{ uri: article?.url || '' }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
