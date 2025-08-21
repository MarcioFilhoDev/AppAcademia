// Contexto responsavel por gerenciar estatisticas, como altura, peso...

import React, { createContext, useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './auth';
import { ActivityIndicator, Alert } from 'react-native';

export const UserStaticsContext = createContext({});

export function UserStaticsProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // Verificando se existe um documento ja criado pelo usuario
      async function verificaDados() {
        setLoading(true);

        const documento = firestore()
          .collection('users-statics')
          .doc(user.userID);

        const snap = await documento.get();

        // Caso exista, envia um vetor com as informacoes de peso e altura
        if (snap.exists) {
          Alert.alert(
            'Documento existe',
            `${snap.data().peso} | ${snap.data().altura}`,
          );
        } else {
          Alert.alert('Documento não existe');
        }
      }

      verificaDados();
      setLoading(false);
    }, []),
  );

  async function changeWeight(peso, altura) {
    // Primeiro verifica se existe um documento criado

    await firestore().collection('users-statics').doc(user.userID).set({
      peso: peso,
      altura: altura,
      ultima_atualizacao: new Date(),
    });

    setLoading(false);
  }

  if (loading) {
    return <ActivityIndicator size={'large'} color={'orange'} />;
  }

  return (
    <UserStaticsContext.Provider value={{ changeWeight }}>
      {children}
    </UserStaticsContext.Provider>
  );
}
