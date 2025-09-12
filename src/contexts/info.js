import React, { createContext, useContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

// Utilizar AuthContext para pegar Id do usuario
import { AuthContext } from './auth';
import { Alert } from 'react-native';

export const InfoContext = createContext({});

export function InfoProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [info, setInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  // Responsavel por regastar os dados
  useEffect(() => {
    setLoading(true);
    if (!user?.userID) return;

    // Funcao responsavel por pegar os dados do documento do usuario

    const doc = firestore()
      .collection('estatisticas_alunos')
      .doc(user.userID)
      .onSnapshot(dados => {
        if (dados.exists) {
          setInfo(dados.data());
          setLoading(false);
        } else {
          console.log('Nenhum dado encontrado');
          setLoading(false);
        }
      });

    return () => doc();
  }, [user?.userID]);

  // Salva e atualiza no banco de dados
  async function enviandoInformacoes(peso, altura) {
    setLoading(true);
    await firestore().collection('estatisticas_alunos').doc(user.userID).set({
      last_update: new Date(),
      peso: peso,
      altura: altura,
    });
    setLoading(false);
  }

  function calcularIMC() {
    if (info) {
      Alert.alert(info);
    }
  }

  return (
    <InfoContext.Provider
      value={{ info, enviandoInformacoes, loading, calcularIMC }}
    >
      {children}
    </InfoContext.Provider>
  );
}
