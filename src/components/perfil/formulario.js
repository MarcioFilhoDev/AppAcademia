import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import { colors } from '../../constants/colors';

export default function Formulario({ fecharFormulario }) {
  const { user } = useContext(AuthContext);

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  async function alterandoDados(Peso, Altura) {
    await firestore().collection('users-statics').doc(user.userID).set({
      atualizado_em: new Date(),
      peso: Peso,
      altura: Altura,
    });

    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
  }

  function handleCloseModal() {
    fecharFormulario();
  }

  function salvarAlteracoes() {
    // Verificar se o usuario preencheu os campos
    if (peso.length === 0 || altura.length === 0) {
      Alert.alert('Preencha os dados', 'Você não preencheu os dados.');
      return;
    }

    // Transformando string para float
    const pesoReal = parseFloat(peso);
    const alturaReal = parseFloat(altura);

    alterandoDados(pesoReal, alturaReal);
    fecharFormulario();
  }

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss;
        handleCloseModal();
      }}
    >
      <View className="flex-1 justify-center px-20 mt-4">
        <View className="bg-white p-6 rounded-2xl shadow-lg elevation">
          {/*  */}
          <Text className="text-lg mb-2 text-gray-800">Seu peso atual:</Text>
          <TextInput
            placeholder="Exemplo: 64.8"
            keyboardType="number-pad"
            className="bg-slate-50 rounded-md px-4 py-2 mb-4 border border-gray-300"
            maxLength={6}
            value={peso}
            onChangeText={text => setPeso(parseInt(text, 10))}
          />

          <Text className="text-lg mb-2 text-gray-800">Sua altura:</Text>
          <TextInput
            placeholder="Exemplo: 1.75"
            keyboardType="number-pad"
            className="bg-slate-50 rounded-md px-4 py-2 mb-6 border border-gray-300"
            maxLength={4}
            value={altura}
            onChangeText={text => setAltura(parseFloat(text))}
          />
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={handleCloseModal}
              activeOpacity={0.75}
              className="flex-1 bg-gray-300 py-3 rounded-xl mr-2 items-center elevation-sm"
            >
              <Text className="text-gray-800 font-medium">Cancelar</Text>
            </TouchableOpacity>

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
