import React from 'react';

// Import do tipo de navegacao apos login
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

// Import das screens
import Home from '../screens/app-screens/home';
import Receitas from '../screens/app-screens/receitas';
import Profile from '../screens/app-screens/perfil';
import Treinos from '../screens/app-screens/treinos';
import Chat from '../screens/app-screens/chat';

// Import dos icones
import Feather from 'react-native-vector-icons/Feather';
import Lucide from '@react-native-vector-icons/lucide';
import { colors } from '../constants/colors';

export default function AppRoutes() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="Receitas"
        component={Receitas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Lucide name="chef-hat" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="Treinos"
        component={Treinos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Lucide name="dumbbell" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Lucide name="messages-square" color={color} size={30} />;
          },
        }}
      />

      <Tabs.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={30} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
