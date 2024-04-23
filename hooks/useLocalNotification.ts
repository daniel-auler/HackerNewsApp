import { isDevice } from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { NotificationProps } from '~/types/article';
import { handleRegistrationError } from '~/utils/utils';

// the first time that user opens the app, we need to check if notifications are enabled
export const requestPushNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to let you know when a new article arrive!');
      return;
    }
  } else {
    handleRegistrationError('notification only works on devices, not on simulators');
  }
};

export const scheduleNotification = async ({ articleId, articleTitle }: NotificationProps) => {
  const schedulingOptions = {
    content: {
      title: 'A new article has arrived!',
      body: articleTitle,
      url: `hackersnews://(drawer)/home/article/${articleId}`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger: {
      seconds: 5,
    },
  };

  await Notifications.scheduleNotificationAsync(schedulingOptions);
};
