globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import './global.css';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { InfoProvider } from './src/contexts/info';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <InfoProvider>
          <Routes />
        </InfoProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
