import React from 'react';

// Import do tipo de navegacao apos login
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

// Import das screens
import Home from '../screens/app-screens/home';
import Exercicios from '../screens/app-screens/exercicios';
import Calculos from '../screens/app-screens/calculos';
import receitas from '../screens/app-screens/receitas';

export default function AppRoutes() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Exercicios" component={Exercicios} />

      <Tabs.Screen name="Calculos" component={Calculos} />

      <Tabs.Screen name="Home" component={Home} />

      <Tabs.Screen name="Receitas" component={receitas} />
    </Tabs.Navigator>
  );
}
