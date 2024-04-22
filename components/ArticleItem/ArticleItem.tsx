import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import * as WebBrowser from 'expo-web-browser';
import { Platform, TouchableHighlight } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { XStack, YStack } from 'tamagui';

import { Subtitle, Title } from '~/tamagui.config';
import { Article } from '~/types/article';
import { formatDate } from '~/utils/utils';

type Props = {
  item: Article;
};

const ArticleItem: React.FC<Props> = ({ item }) => {
  const [isFavorite] = useMMKVBoolean(`article-${item.id}`);

  return (
    <TouchableHighlight
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(item.url as string);
        }
      }}
      style={{
        backgroundColor: colorTokens.light.blue.blue1,
      }}
      underlayColor="#AAA">
      <YStack
        paddingHorizontal="$2"
        paddingVertical="$2"
        height="$8"
        borderBottomColor="#ccc"
        borderBottomWidth={1}
        justifyContent="space-between">
        <Title>{item.title}</Title>
        <XStack alignItems="center">
          <Subtitle>
            {item.author} - {formatDate(item.created_at)}
          </Subtitle>
          {isFavorite && <Ionicons name="heart" size={24} color="red" />}
        </XStack>
      </YStack>
    </TouchableHighlight>
  );
};

export default ArticleItem;
