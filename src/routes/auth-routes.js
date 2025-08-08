import React from 'react';

// Import do tipo de navegacao das telas de auth
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Import das screens
import SignIn from '../screens/auth-screens/signin';
import SignUp from '../screens/auth-screens/signup';

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
