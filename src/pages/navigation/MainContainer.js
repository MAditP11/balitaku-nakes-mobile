import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

import HomeScreen from './HomeScreen';
// import ChatScreen from './ChatScreen';
import NotifPage from '../NotifPages/NotifPage';
import ProfilScreen from './ProfilScreen';
//https://dev.to/codekagei/react-native-custom-tab-component-reactnative-navigation-1d39
const homeScreen = 'home';
const notifScreen = 'Notifikasi';
const profilScreen = 'Profil';

// MAIN TAB NAVIGATION

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const rn = route.name;

          if (rn === homeScreen) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === notifScreen) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (rn === profilScreen) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.PRIMARY_PURPLE,
        tabBarInactiveTintColor: Colors.SECONDARY_PURPLE,
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { paddingBottom: 10 },
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name={homeScreen} component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name={notifScreen} component={NotifPage} />
      <Tab.Screen options={{ headerShown: false }} name={profilScreen} component={ProfilScreen} />
    </Tab.Navigator>
  );
}
