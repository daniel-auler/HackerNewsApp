import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    <Link
      href={`/(drawer)/home/article/${item.id}`}
      push
      asChild
      style={{
        backgroundColor: colorTokens.light.blue.blue1,
        paddingHorizontal: 16,
        paddingVertical: 10,

        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
      }}>
      <Pressable>
        <TouchableOpacity>
          <YStack justifyContent="space-between" height={64}>
            <Title>{item.title}</Title>
            <XStack alignItems="center">
              <Subtitle>
                {item.author} - {formatDate(item.created_at)}
              </Subtitle>
              {isFavorite && <Ionicons testID="favorite-icon" name="heart" size={24} color="red" />}
            </XStack>
          </YStack>
        </TouchableOpacity>
      </Pressable>
    </Link>
  );
};

export default ArticleItem;
