// Contexto responsavel por gerenciar treinos

import React, { createContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

export const UserExercisesContext = createContext({});

export function UserDocsProvider({ children }) {
  return (
    <UserExercisesContext.Provider value={{}}>
      {children}
    </UserExercisesContext.Provider>
  );
}
