import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';

const Layout: React.FC = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.light.blue.blue7,
        drawerLabelStyle: { marginLeft: -20 },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'Hacker News',
          headerShown: true,
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="deleted"
        options={{
          title: 'Deleted',
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trash-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;
