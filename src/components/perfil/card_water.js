import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { InfoContext } from '../../contexts/info';

export default function WaterCard() {
  const { info } = useContext(InfoContext);

  if (!info?.peso) {
    return (
      <View className="flex-1 justify-center">
        <View className="bg-white rounded-2xl p-4 items-center elevation">
          <Text className="text-lg font-semibold text-gray-800">
            Dados insuficientes
          </Text>
          <Text className="text-gray-500 mt-2 text-center">
            Informe seu peso para calcular a quantidade de água ideal.
          </Text>
        </View>
      </View>
    );
  }

  const peso = parseFloat(info.peso);
  const aguaMl = peso * 35; // ml por kg
  const aguaLitros = aguaMl / 1000;

  return (
    <View className="flex-1 justify-center items-center ">
      <View className="bg-white rounded-2xl p-6 w-full items-center elevation">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Quantidade recomendada
        </Text>

        <Text className="text-4xl font-extrabold text-blue-500">
          {aguaLitros.toFixed(2)} L
        </Text>

        <Text className="text-lg text-gray-700 mt-2">Água diária</Text>

        <View className="mt-4 w-full items-center">
          <Text className="text-sm text-gray-500">Baseando no seu peso</Text>
          <Text className="text-base font-semibold text-gray-800">
            {peso} kg × 35 ml = {aguaMl} ml
          </Text>
        </View>
      </View>
    </View>
  );
}
