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
    async function resgatarDados() {
      try {
        const snapshot = await firestore()
          .collection('user_treinos')
          .doc(user.userID)
          .get();

        if (snapshot.exists) {
          const data = snapshot.data();

          setDados(data.treinos || []);
        } else {
          setLoading(false);
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao recuperar os dados');
        setDados([]);
      } finally {
        setLoading(false);
      }
    }
    resgatarDados();
  }, [user?.userID]);

  async function salvarDados(diasTreino, objetivo, dor, descDor) {
    await firestore().collection('user_treinos_config').doc(user.userID).set({
      userID: user.userID,
      qtd_treinos: diasTreino,
      objetivos: objetivo,
      dor: dor,
      descricao_dor: descDor,
      status: 'aguardando',
      atualizado_em: new Date(),
    });

    // Teste para ver como fica - atraves do aplicativo do professor que vai criar
    // o documento
    await firestore()
      .collection('user_treinos')
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
    <TreinoContext.Provider value={{ dados, salvarDados }}>
      {children}
    </TreinoContext.Provider>
  );
}
