import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { Text, View } from 'tamagui';

import { Article } from '~/types/article';

type HiddenItemType = {
  data: { item: Article };
  leftActionActivated: boolean;
  rightActionActivated: boolean;
  swipeAnimatedValue: Animated.Value;
  rowActionAnimatedValue: Animated.Value;
  rowHeightAnimatedValue: Animated.Value;
};

export const HiddenItem = ({
  data: { item },
  rightActionActivated,
  rowActionAnimatedValue,
  rowHeightAnimatedValue,
  leftActionActivated,
  swipeAnimatedValue,
}: HiddenItemType) => {
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

  if (rightActionActivated) {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 500,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 75,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View
      style={[
        styles.rowBack,
        { height: rowHeightAnimatedValue },
        leftActionActivated && { backgroundColor: 'lightgreen' },
      ]}>
      <Text>Left</Text>
      {!leftActionActivated && (
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => toggleFavorite()}>
          <FontAwesome
            name={isFavorite ? 'star' : 'star-o'}
            size={30}
            color={isFavorite ? 'green' : 'black'}
          />
        </TouchableOpacity>
      )}
      {!leftActionActivated && (
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            { flex: 1, width: rowActionAnimatedValue },
          ]}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => console.log('deleted', item.id)}>
            <Animated.View
              style={[
                styles.backTextWhite,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => console.log('deleted', item.id)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => toggleFavorite()}>
        <FontAwesome
          name={isFavorite ? 'star' : 'star-o'}
          size={30}
          color={isFavorite ? 'green' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleDelete.mutate({ id: item.id })}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
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
