import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Linking, Switch } from 'react-native';
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';
import { Label, YStack, XStack, Text } from 'tamagui';

import { Container, Title } from '~/tamagui.config';
import { handleRegistrationError } from '~/utils/utils';

const Page: React.FC = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    useMMKVBoolean('isNotificationsEnabled');
  const [selectedPlatform, setSelectedPlatform] = useMMKVString('selectedPlatform');
  console.log('isNotificationsEnabled', isNotificationsEnabled);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await Notifications.getPermissionsAsync();
      if (settings.status === 'granted') {
        setIsNotificationsEnabled(true);
      }
    };
    getSettings();
  }, []);

  const handleNotificationEnabling = async (checked: boolean) => {
    const settings = await Notifications.getPermissionsAsync();
    // On iOS 14.5 and later, the user can't change the notification settings from the app
    if (!settings.canAskAgain) {
      Linking.openURL('app-settings://notification/hackersnews');
    }

    if (checked && settings.status === 'granted') {
      return setIsNotificationsEnabled(true);
    } else if (checked && settings.status !== 'granted') {
      const newSettings = await Notifications.requestPermissionsAsync();
      if (newSettings.status === 'granted') {
        setIsNotificationsEnabled(true);
        return;
      } else {
        setIsNotificationsEnabled(false);
        handleRegistrationError(
          'Permission not granted to let you know when a new article arrive!'
        );
        return;
      }
    }
    setIsNotificationsEnabled(false);
    handleRegistrationError('Permission not granted to let you know when a new article arrive!');
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
