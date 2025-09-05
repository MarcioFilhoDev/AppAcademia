globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import './global.css';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { InfoProvider } from './src/contexts/info';
import { TreinoProvider } from './src/contexts/treinos';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <InfoProvider>
          <TreinoProvider>
            <Routes />
          </TreinoProvider>
        </InfoProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
