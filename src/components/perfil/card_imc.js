import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { InfoContext } from '../../contexts/info';

export default function IMCCard() {
  const { info } = useContext(InfoContext);

  // Se não tiver dados ainda, exibe tal mensagem
  if (!info?.peso || !info?.altura) {
    return (
      <View className="flex-1 justify-center">
        <View className="bg-white h-full rounded-2xl p-4 items-center elevation">
          <Text className="text-lg font-semibold text-gray-800">
            Dados insuficientes
          </Text>
          <Text className="text-gray-500 mt-2 text-center">
            Informe seu peso e sua altura para saber o seu IMC
          </Text>

          <Text className="text-neutral-500">
            O IMC é calculado pela formula: peso / altura * altura
          </Text>
        </View>
      </View>
    );
  }

  const peso = parseFloat(info.peso);
  const altura = parseFloat(info.altura);
  const imc = peso / (altura * altura);

  // Determinando descrição do IMC
  function classificaIMC(valor) {
    if (valor < 18.5) return 'Abaixo do peso';
    if (valor >= 18.5 && valor < 24.9) return 'Peso normal';
    if (valor >= 25 && valor < 29.9) return 'Sobrepeso';
    if (valor >= 30 && valor < 34.9) return 'Obesidade grau I';
    if (valor >= 35 && valor < 39.9) return 'Obesidade grau II';
    return 'Obesidade grau III';
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="bg-white rounded-2xl p-6 w-full items-center elevation">
        <Text className="text-xl font-bold text-gray-800 mb-2">Seu IMC</Text>

        <Text className="text-4xl font-extrabold text-indigo-600">
          {imc.toFixed(2)}
        </Text>

        <Text className="text-lg text-gray-700 mt-2">{classificaIMC(imc)}</Text>

        <View className="mt-4 w-full flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-sm text-gray-500">Peso</Text>
            <Text className="text-base font-semibold text-gray-800">
              {peso} kg
            </Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-sm text-gray-500">Altura</Text>
            <Text className="text-base font-semibold text-gray-800">
              {altura} m
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
