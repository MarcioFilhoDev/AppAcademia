import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

export default function Formulario({ fechar }) {
  const { user } = useContext(AuthContext);

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  async function alterandoDados(valuePeso, valueAltura) {
    if (valuePeso === '' || valueAltura === '') {
      Alert.alert('Erro', 'Preencha os dados corretamente');
      return;
    }

    await firestore().collection('users-statics').doc(user.userID).set({
      atualizado_em: new Date(),
      peso: valuePeso,
      altura: valueAltura,
    });

    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
  }

  function handleCloseModal() {
    fechar();
  }

  function salvarAlteracoes() {
    alterandoDados(peso, altura);
    fechar();
  }

  return (
    <View className="flex-1 justify-center px-20 mt-4">
      <View className="bg-white p-6 rounded-2xl shadow-lg">
        <Text className="text-lg mb-2 text-gray-800">Seu peso atual:</Text>
        <TextInput
          placeholder="Exemplo: 64.8"
          keyboardType="number-pad"
          className="bg-slate-50 rounded-md px-4 py-2 mb-4 border border-gray-300"
          maxLength={6}
          value={peso}
          onChangeText={text => setPeso(text)}
        />

        <Text className="text-lg mb-2 text-gray-800">Sua altura:</Text>
        <TextInput
          placeholder="Exemplo: 1.75"
          keyboardType="number-pad"
          className="bg-slate-50 rounded-md px-4 py-2 mb-6 border border-gray-300"
          maxLength={4}
          value={altura}
          onChangeText={text => setAltura(text)}
        />

        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={handleCloseModal}
            activeOpacity={0.75}
            className="flex-1 bg-gray-300 py-3 rounded-xl mr-2 items-center"
          >
            <Text className="text-gray-800 font-semibold">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={salvarAlteracoes}
            activeOpacity={0.75}
            className="flex-1 bg-orange-500 py-3 rounded-xl ml-2 items-center"
          >
            <Text className="text-white font-semibold">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
