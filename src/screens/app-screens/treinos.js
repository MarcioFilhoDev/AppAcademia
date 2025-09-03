import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth';
import { colors } from '../../constants/colors';

import firestore from '@react-native-firebase/firestore';

// Telas
import FormularioTreino from '../../components/treinos/formulario_treino';
import { useFocusEffect } from '@react-navigation/native';

export default function Treinos() {
  // Verificacao se existe algum documento com id do usuario
  const { user } = useContext(AuthContext);

  const [statusPerguntas, setStatusPerguntas] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setStatusPerguntas(null);

      async function checkCollection() {
        const searchDoc = await firestore()
          .collection('user_treinos_config')
          .where('userID', '==', user.userID)
          .limit(1)
          .get();

        if (!searchDoc.empty) {
          // Alert.alert('Encontrado');
        } else {
          Alert.alert('Nao Encontrado');
        }
      }

      checkCollection();
    }, [user.userID]),
  );

  async function salvarDados(diasTreino, objetivo, dor, descDor) {
    await firestore().collection('user_treinos_config').doc(user.userID).set({
      userID: user.userID,
      qtd_treinos: diasTreino,
      objetivos: objetivo,
      dor: dor,
      descricao_dor: descDor,
      atualizado_em: new Date(),
    });

    setStatusPerguntas(null);
  }

  return (
    <View className="flex-1 px-6">
      <View
        className="w-full items-center"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <Text className="text-center text-2xl w-3/4">
          Aqui você defini sua rotina semanal de treinos.
        </Text>
      </View>

      <View
        style={{
          height: 0.5,
          backgroundColor: '#000',
          width: '100%',
          marginTop: 8,
          marginBottom: 12,
        }}
      >
        <Text> </Text>
      </View>

      {statusPerguntas ? (
        <FormularioTreino
          fechar={() => setStatusPerguntas(false)}
          enviarDados={salvarDados}
        />
      ) : (
        <View className="w-full items-center">
          {/* Botão para iniciar teste */}
          <TouchableOpacity
            onPress={() => setStatusPerguntas(true)}
            activeOpacity={0.7}
            style={{ backgroundColor: colors.primary }}
            className="w-1/2 py-3.5 rounded-md elevation"
          >
            <Text className="text-center text-base font-medium ">
              Responder
            </Text>
          </TouchableOpacity>

          <Text className="opacity-45 mt-20">
            Você ainda não respondeu o questionário.
          </Text>
        </View>
      )}
    </View>
  );
}
