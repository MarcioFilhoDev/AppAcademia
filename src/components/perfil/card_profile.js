import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

export default function CardProfile({ abrirFormulario }) {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  // falso -> nao existe dados | true -> exite dados
  const [acao, setAcao] = useState(false);

  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    // Acessar colection criada, e resgatar dados
    // Funcao para resgatar data de criacao da conta do usuario
    async function getCreatedUserDate() {
      const docNap = await firestore()
        .collection('users')
        .doc(user.userID)
        .get();

      const data = docNap.data();
      // Convertendo para timestamp
      const createdDate = data?.created?.toDate();
      setCreatedAt(createdDate);
    }

    // Resgatando peso e altura salvos
    async function getPesoEAltura() {
      // 1 - Verificando se existe o documento criado pelo usuario
      // Se não existir, renderiza um texto e um botão para inserir mais dados
      const data = await firestore()
        .collection('users-statics')
        .doc(user.userID)
        .get();

      // Verificando se existe o documento
      if (data.exists) {
        const dadosDoUsuario = data.data();

        if (dadosDoUsuario) {
          setLoading(false);
          setAcao(true);
          setPeso(dadosDoUsuario?.peso ?? '');
          setAltura(dadosDoUsuario?.altura ?? '');
        } else {
          // Se não existir o documento, então renderiza outra coisa
          setAcao(false);
          setLoading(false);
        }
      } else {
        setAcao(false);
        setLoading(false);
      }
    }

    getCreatedUserDate();
    getPesoEAltura();
  }, [user?.userID]);

  return (
    <View className="mx-4 -mt-16 bg-white rounded-xl elevation p-6 items-center">
      {/* Foto do usuário - sistema de armazenamento das fotos com cloud storage */}
      <Image
        source={{ uri: 'https://i.pravatar.cc/301' }}
        className="w-28 h-28 rounded-full border-4 border-white -mt-16"
      />

      {/* Nome e informacoes */}
      <Text className="mt-2 text-xl font-bold text-gray-800">{user.nome}</Text>

      <Text className="text-gray-500">
        Membro desde {createdAt ? createdAt.getFullYear() : 'Carregando...'}
      </Text>

      {/* Informações */}
      <View className="flex-row mt-3 justify-around w-full">
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800 justify-center">
            {loading ? (
              <ActivityIndicator size={20} color={'#1f2937'} />
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
            {peso} kg
          </Text>
          <Text className="text-sm text-gray-500">Peso</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">
            {loading ? (
              <ActivityIndicator size={20} color={'#1f2937'} />
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
            {altura} m
          </Text>
          <Text className="text-sm text-gray-500">Altura</Text>
        </View>
      </View>

      {/* Botões de ação */}
      <View className="flex-row mt-6 w-full justify-around">
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => abrirFormulario()}
          className="px-6 py-3 rounded-xl bg-orange-400 elevation-sm"
        >
          <Text className="text-neutral-900 font-semibold">
            {acao ? 'Editar ' : 'Inserir '}
            dados
          </Text>
        </TouchableOpacity>

        {/* Alterar foto */}
        <TouchableOpacity
          activeOpacity={0.75}
          className="bg-gray-200 px-6 py-3 rounded-xl elevation"
        >
          <Text className="text-gray-800 font-semibold">Alterar foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
