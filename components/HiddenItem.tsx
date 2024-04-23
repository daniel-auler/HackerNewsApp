import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { Text } from 'tamagui';

import { Article } from '~/types/article';

type HiddenItemType = {
  item: Article;
  hasDeleteAction?: boolean;
};

export const HiddenItem = ({ item, hasDeleteAction }: HiddenItemType) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`article-${item.id}`);
  const [favorites, setFavorites] = useMMKVObject<Article[]>('favorites');
  const queryClient = useQueryClient();

  const toggleFavorite = () => {
    const current = favorites || [];
    if (!isFavorite) {
      setFavorites([...current, { ...item }]);
    } else {
      setFavorites(current.filter((article) => article.id !== item.id));
    }
    setIsFavorite(!isFavorite);
  };

  const updateLocalArticleList = (id: number) => {
    queryClient.setQueryData<Article[]>(['articles'], (articlesList) =>
      articlesList?.filter((article) => article.id !== id)
    );
  };

  const handleDelete = useMutation({
    mutationKey: ['articles'],
    mutationFn: async (payload: { id: number }) => updateLocalArticleList(payload.id),
  });

  return (
    <Animated.View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => toggleFavorite()}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorite ? 'red' : 'black'}
        />
      </TouchableOpacity>
      {hasDeleteAction && (
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => handleDelete.mutate({ id: item.id })}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    // backgroundColor: "yellow",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  favoriteText: {
    color: 'green',
  },
  normalText: {
    color: 'black',
  },
});
