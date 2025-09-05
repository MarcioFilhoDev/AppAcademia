import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';

import { colors } from '../../constants/colors';
import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

// Telas
import FormularioTreino from '../../components/treinos/formulario_treino';
import { TreinoContext } from '../../contexts/treinos';

export default function Treinos() {
  const { salvarDados } = useContext(TreinoContext);
  // Verificacao se existe algum documento com id do usuario
  const { user } = useContext(AuthContext);

  const [statusPerguntas, setStatusPerguntas] = useState(null);

  const [estado, setEstado] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setStatusPerguntas(null);

      // Verificacao se existe um documento para alterar o que aparece para ele
      async function checkCollection() {
        const searchDoc = await firestore()
          .collection('user_treinos_config')
          .where('userID', '==', user.userID)
          .limit(1)
          .get();

        if (!searchDoc.empty) {
          // Alert.alert('Encontrado');
          setEstado('Você já realizou o seu pedido de treinos.');
        } else {
          setEstado('Você ainda não realizou o seu pedido de treinos');
        }
      }

      checkCollection();
    }, [user.userID]),
  );

  return (
    <View className="flex-1 px-6">
      <View
        className="w-full items-center"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <Text className="text-center text-2xl w-3/4">
          Aqui você define a sua rotina semanal de treinos.
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
          enviarDados={(quantidadeTreinos, objetivo, dor, descricaoDor) => {
            salvarDados(quantidadeTreinos, objetivo, dor, descricaoDor);
            setStatusPerguntas(null);
          }}
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

          <Text className="opacity-45 mt-20">{estado}</Text>
        </View>
      )}
    </View>
  );
}
