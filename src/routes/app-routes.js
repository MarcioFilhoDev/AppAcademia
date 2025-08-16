import React from 'react';

// Import do tipo de navegacao apos login
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

// Import das screens
import Home from '../screens/app-screens/home';
import Exercicios from '../screens/app-screens/exercicios';
import Calculos from '../screens/app-screens/calculos';
import Receitas from '../screens/app-screens/receitas';

import Feather from 'react-native-vector-icons/Feather';
import Lucide from '@react-native-vector-icons/lucide';
import Profile from '../screens/app-screens/perfil';

export default function AppRoutes() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Exercicios"
        component={Exercicios}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Lucide name="dumbbell" color={color} size={size} />;
          },
        }}
      />

      <Tabs.Screen
        name="Calculos"
        component={Calculos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Lucide name="calculator" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Receitas"
        component={Receitas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Lucide name="chef-hat" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
