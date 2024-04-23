import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV, useMMKVBoolean } from 'react-native-mmkv';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

import { useBackgroundTask } from '~/hooks/useBackgroundTask';
import { requestPushNotificationPermission } from '~/hooks/useLocalNotification';
import { useNotificationObserver } from '~/hooks/useNotificationObserver';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
    },
  },
});

const storage = new MMKV();

const clientStorage = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

const persister = createAsyncStoragePersister({
  storage: clientStorage,
  throttleTime: 3000,
});

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    useMMKVBoolean('isNotificationsEnabled');

  useNotificationObserver();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isNotificationsEnabled === undefined || isNotificationsEnabled === false) {
      requestPushNotificationPermission()
        .then(() => setIsNotificationsEnabled(true))
        .catch(() => {
          return setIsNotificationsEnabled(false);
        });
    }
  }, []);

  // useBackgroundTask();
  if (!loaded) return null;
  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PersistQueryClientProvider
          persistOptions={{ persister }}
          onSuccess={() => queryClient.invalidateQueries()}
          client={queryClient}>
          <Slot />
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
