import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';

import { colors } from '../../constants/colors';
import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

// Telas
import FormularioTreino from '../../components/treinos/formulario_treino';

export default function Treinos() {
  // Verificacao se existe algum documento com id do usuario
  const { user } = useContext(AuthContext);

  const [statusPerguntas, setStatusPerguntas] = useState(null);
  const [block, setBlock] = useState(null);

  const [estado, setEstado] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setStatusPerguntas(null);

      // Verificando se existe um documento
      async function checkCollection() {
        const searchDoc = await firestore()
          .collection('user_treinos_config')
          .where('userID', '==', user.userID)
          .limit(1)
          .get();

        if (!searchDoc.empty) {
          setEstado('Você já realizou o seu pedido de treinos.');
          // setBlock(true);
        } else {
          // setBlock(false);
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
        // Formulario recebe a funcao fechar que minimiza o formulario
        <FormularioTreino fechar={() => setStatusPerguntas(false)} />
      ) : (
        <View className="w-full items-center">
          {/* Botão para iniciar teste */}
          <TouchableOpacity
            disabled={block}
            onPress={() => setStatusPerguntas(true)}
            activeOpacity={0.7}
            style={
              block
                ? { backgroundColor: 'grey' }
                : { backgroundColor: colors.primary }
            }
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
