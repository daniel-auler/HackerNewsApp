import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Linking, Switch } from 'react-native';
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';
import { Label, YStack, XStack, Text } from 'tamagui';

import { Container, Title } from '~/tamagui.config';

const Page: React.FC = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    useMMKVBoolean('isNotificationsEnabled');
  const [selectedPlatform, setSelectedPlatform] = useMMKVString('selectedPlatform');

  const getSettings = async () => {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.status === 'granted') {
      setIsNotificationsEnabled(true);
    } else {
      setIsNotificationsEnabled(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSettings();
    }, [])
  );

  const handleNotificationEnabling = async (checked: boolean) => {
    const settings = await Notifications.getPermissionsAsync();

    if (checked && settings.status === 'granted') {
      return setIsNotificationsEnabled(true);
    } else if (checked && settings.status !== 'granted') {
      // On iOS 14.5 and later, the user can't change the notification settings from the app
      Linking.openURL('app-settings://notification/hackersnews');
      return;
    }
    setIsNotificationsEnabled(false);
  };

  return (
    <Container>
      <Title>Configurations</Title>
      <YStack gap="$4" mt="$2">
        <XStack justifyContent="space-between" gap="$4" alignItems="center">
          <Label
            paddingRight="$0"
            minWidth={90}
            justifyContent="flex-end"
            size="$4"
            color="black"
            htmlFor="notification-switch">
            Notifications
          </Label>
          <Switch
            id="notification-switch"
            value={Boolean(isNotificationsEnabled)}
            onValueChange={handleNotificationEnabling}
          />
        </XStack>
        <YStack gap="$1">
          <Text fontSize="$4">
            Select the platform for which you'd like to receive notifications:"{' '}
          </Text>
          <Picker
            enabled={Boolean(isNotificationsEnabled)}
            mode="dialog"
            prompt="Select platform"
            selectedValue={selectedPlatform || 'ios'}
            onValueChange={(value) => setSelectedPlatform(value)}>
            <Picker.Item label="iOS" value="ios" />
            <Picker.Item label="Android" value="android" />
          </Picker>
        </YStack>
      </YStack>
    </Container>
  );
};

export default Page;
