import React, { createContext, useContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './auth';
import { ActivityIndicator, Alert, View } from 'react-native';
import { colors } from '../constants/colors';

export const TreinoContext = createContext({});

export function TreinoProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [dados, setDados] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.userID) return;

    setLoading(true);

    const docSnap = firestore()
      .collection('requisicoes_realizadas')
      .doc(user.userID)
      .onSnapshot(
        snapshot => {
          if (snapshot.exists) {
            const data = snapshot.data();
            setDados(data?.treinos);
          } else {
            setDados([]);
          }
          setLoading(false);
        },
        error => {
          Alert.alert('Erro', error.message);
          setLoading(false);
        },
      );

    // Cancela o listener quando desmontar
    return () => docSnap();
  }, [user?.userID]);

  // Salva a requisição feita pelo usuário
  async function salvandoRequisicao(diasTreino, objetivo, dor, descDor) {
    await firestore().collection('requisicoes_treino').doc(user.userID).set({
      aluno: user.nome,
      quantidade_treinos: diasTreino,
      objetivo: objetivo,
      possui_dor: dor,
      descricao_dor: descDor,
      status: 'Aguardando',
      criado_em: new Date(),
    });

    // Teste para ver como fica
    // O aplicativo do professor vai criar esse documento
    await firestore()
      .collection('requisicoes_realizadas')
      .doc(user.userID)
      .set({
        quantidade_treinos: diasTreino,
        objetivo: objetivo,
        sente_dores: [dor, descDor],
        treinos: [
          {
            nome: 'Treino A',
            exercicios: [
              {
                nome: 'Supino reto',
                url_video:
                  'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-side_KciuhbB.mp4',
                series: 4,
                repeticoes: 12,
                finalzado: false,
              },
              {
                nome: 'Supino Inclinado',
                series: 3,
                repeticoes: 12,
                finalzado: false,
              },
            ],
          },
          {
            nome: 'Treino B',
            exercicios: [
              {
                nome: 'Agachamento Livre',
                series: 4,
                repeticoes: 8,
                finalzado: false,
              },
              {
                nome: 'Leg Press',
                series: 3,
                repeticoes: 12,
                finalzado: false,
              },
            ],
          },
        ],
        atualizado_em: new Date(),
      });
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={30} color={colors.primary} />
      </View>
    );
  }

  return (
    <TreinoContext.Provider value={{ dados, salvandoRequisicao }}>
      {children}
    </TreinoContext.Provider>
  );
}
