import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { colors } from '../../constants/colors';
import FormularioTreino from '../../components/formulario';

export default function Treinos() {
  // Verificacao se existe algum documento com id do usuario
  const [statusPerguntas, setStatusPerguntas] = useState(true);

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
        <FormularioTreino />
      ) : (
        <View className="w-4/5 items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ backgroundColor: colors.primary }}
            className="w-1/2 py-3.5 rounded-md elevation"
          >
            <Text className="text-center text-base font-medium ">
              Começar teste
            </Text>
          </TouchableOpacity>

          <Text className="opacity-45 mt-20">
            Ainda não temos suas respostas.
          </Text>
        </View>
      )}
    </View>
  );
}
