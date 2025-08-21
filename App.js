import './global.css';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { UserStaticsProvider } from './src/contexts/user-statics';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserStaticsProvider>
          <Routes />
        </UserStaticsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
