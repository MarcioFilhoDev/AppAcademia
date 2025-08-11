import React from 'react';

// Import do tipo de navegacao apos login
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

// Import das screens
import Home from '../screens/app-screens/home';
import Exercicios from '../screens/app-screens/exercicios';
import Calculos from '../screens/app-screens/calculos';
import Receitas from '../screens/app-screens/receitas';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function AppRoutes() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Exercicios"
        component={Exercicios}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="dumbbell" color={color} size={size} />;
          },
        }}
      />

      <Tabs.Screen
        name="Calculos"
        component={Calculos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calculator" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Receitas"
        component={Receitas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="utensils" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
