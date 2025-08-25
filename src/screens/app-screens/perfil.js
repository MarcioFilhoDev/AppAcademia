import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../../contexts/auth';
import Formulario from '../../components/pefil/formulario';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const [miniLoading, setMiniLoading] = useState(true);
  const [formulario, setFormulario] = useState(false);

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
          setMiniLoading(false);
          setAcao(true);
          setPeso(dadosDoUsuario?.peso ?? '');
          setAltura(dadosDoUsuario?.altura ?? '');
        } else {
          // Se não existir o documento, então renderiza outra coisa
          setAcao(false);
          setMiniLoading(false);
        }
      } else {
        setAcao(false);
        setMiniLoading(false);
      }
    }

    getCreatedUserDate();
    getPesoEAltura();
  }, [user?.userID]);

  // Deslogar usuario
  async function handleSignOut() {
    await signOut();
  }

  return (
    <ScrollView className="flex-1 bg-gray-200">
      {/* Header com imagem de fundo */}
      <View className="h-40 items-center justify-center bg-orange-400">{}</View>

      {/* Card principal */}
      <View className="mx-4 -mt-16 bg-white rounded-3xl elevation p-6 items-center">
        {/* 
          Foto do usuário - sistema de armazenamento das fotos com cloud storage
        */}
        <Image
          source={{ uri: 'https://i.pravatar.cc/301' }}
          className="w-28 h-28 rounded-full border-4 border-white -mt-14"
        />

        {/* Nome e infos */}
        <Text className="mt-4 text-xl font-bold text-gray-800">
          {user.nome}
        </Text>
        <Text className="text-gray-500">
          Membro desde {createdAt ? createdAt.getFullYear() : 'Carregando...'}
        </Text>

        {/* Informações */}
        <View className="flex-row mt-6 justify-around w-full">
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-800 justify-center">
              {miniLoading ? (
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
              {miniLoading ? (
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
            onPress={() => setFormulario(true)}
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
            className="bg-gray-200 px-6 py-3 rounded-xl"
          >
            <Text className="text-gray-800 font-semibold">Alterar foto</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulario */}
      {formulario ? (
        <Formulario fechar={() => setFormulario(false)} />
      ) : (
        <View>
          <Text> </Text>
        </View>
      )}

      <Button onPress={handleSignOut} title="Sair" />
    </ScrollView>
  );
}
