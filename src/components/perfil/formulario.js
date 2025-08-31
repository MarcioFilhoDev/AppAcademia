import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import { colors } from '../../constants/colors';
import { InfoContext } from '../../contexts/info';
import { useFocusEffect } from '@react-navigation/native';

export default function Formulario({ fecharFormulario }) {
  const { enviandoInformacoes } = useContext(InfoContext);

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  async function salvarAlteracoes() {
    // Verificar se o usuario preencheu os campos
    if (peso.length === 0 || altura.length === 0) {
      Alert.alert('Preencha os dados', 'Você não preencheu os dados.');
      return;
    }

    // Converter a virgula(,) para ponto(.)
    const pesoStr = peso.replace(',', '.');
    const alturaStr = altura.replace(',', '.');

    // Transformando de string para float
    const pesoReal = parseFloat(pesoStr);
    const alturaReal = parseFloat(alturaStr);

    await enviandoInformacoes(pesoReal, alturaReal);
    fecharFormulario(pesoReal, alturaReal);
  }

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss;
      }}
    >
      <View className="flex-1 justify-center">
        <View className="bg-white p-4 rounded-2xl elevation">
          {/* Inserindo o peso  */}
          <Text className="text-lg mb-2 text-gray-800">Seu peso atual:</Text>
          <TextInput
            placeholder="Exemplo: 64.8"
            placeholderTextColor={colors.input}
            keyboardType="number-pad"
            className="bg-slate-50 rounded-md px-4 py-2 mb-4 border border-gray-300"
            maxLength={6}
            value={peso}
            onChangeText={text => setPeso(text)}
          />

          {/* Inserindo a altura  */}
          <Text className="text-lg mb-2 text-gray-800">Sua altura:</Text>
          <TextInput
            placeholder="Exemplo: 1.75"
            placeholderTextColor={colors.input}
            keyboardType="number-pad"
            className="bg-slate-50 rounded-md px-4 py-2 mb-6 border border-gray-300"
            maxLength={4}
            value={altura}
            onChangeText={text => setAltura(text)}
          />

          <View className="flex-row justify-between">
            {/* Botao para cancelar */}
            <TouchableOpacity
              onPress={() => fecharFormulario()}
              activeOpacity={0.75}
              className="flex-1 bg-gray-300 py-3 rounded-xl mr-2 items-center elevation-sm"
            >
              <Text className="text-gray-800 font-medium">Cancelar</Text>
            </TouchableOpacity>

            {/* Botao para salvar */}
            <TouchableOpacity
              onPress={salvarAlteracoes}
              activeOpacity={0.75}
              style={{ backgroundColor: colors.primary }}
              className="flex-1 py-3 rounded-xl ml-2 items-center elevation-sm"
            >
              <Text className={`text-${colors.input} font-medium`}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
