import { Alert, FlatList, StatusBar, Text, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore';

import Lucide from '@react-native-vector-icons/lucide';
import { colors } from '../../constants/colors';
import CardTreinos from '../../components/home/card_treinos';

export default function Home() {
  const { user } = useContext(AuthContext);

  //  Variaveis responsaveis por mostrar a mensagem de boas vidas
  const [mensagem, setMensagem] = useState('');
  const [dia, setDia] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [mes, setMes] = useState('');

  const [loading, setLoading] = useState(false);
  const [progresso, setProgresso] = useState({});

  const diasSemana = [
    { id: 'domingo', label: 'dom.' },
    { id: 'segunda', label: 'seg.' },
    { id: 'terca', label: 'ter.' },
    { id: 'quarta', label: 'qua.' },
    { id: 'quinta', label: 'qui.' },
    { id: 'sexta', label: 'sex.' },
    { id: 'sabado', label: 'sab.' },
  ];

  useFocusEffect(
    useCallback(() => {
      function message() {
        let date = new Date();
        const horas = new Date().getHours().toString();

        if (horas >= 5 && horas <= 11) {
          setMensagem('Bom dia,');
        } else if (horas >= 12 && horas <= 18) {
          setMensagem('Boa tarde,');
        } else {
          setMensagem('Boa noite,');
        }

        const dias = [
          'domingo',
          'segunda-feira',
          'terca-feira',
          'quarta-feira',
          'quinta-feira',
          'sexta-feira',
          'sábado',
        ];

        const meses = [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ];

        setDia(date.getDate());
        setDiaSemana(dias[date.getDay().toString()]);
        setMes(meses[date.getMonth().toString()]);
      }

      async function carregarProgresso() {
        setLoading(true);

        const unsubscribe = firestore()
          .collection('progresso_aluno')
          .doc(user.userID)
          .onSnapshot(
            snapshot => {
              if (snapshot.exists) {
                setProgresso(snapshot.data());
              } else {
                Alert.alert(
                  'Aviso',
                  'Nenhum progresso encontrado para este usuário.',
                );
              }
              setLoading(false);
            },
            error => {
              Alert.alert('Erro', error.message);
              setLoading(false);
            },
          );

        return unsubscribe;
      }

      message();
      // carregarProgresso();
    }, [user.userID]),
  );

  // Quando usuario completar um dia atraves do card do treino daquele dia
  // Completa automaticamente a marcação do dia
  // Funcao para atualizar a lógica do
  // async function toggleDia(dia) {
  //   // Se o valor atual é 1 então passa para 0, e vice e versa
  //   const alterandoValor = progresso[dia] === 1 ? 0 : 1;

  //   await firestore()
  //     .collection('progresso_aluno')
  //     .doc(user.userID)
  //     .update({
  //       [dia]: alterandoValor,
  //       last_update: new Date(),
  //     });

  //   setProgresso(prev => ({
  //     ...prev,
  //     [dia]: alterandoValor,
  //   }));
  // }

  return (
    <View className="flex-1">
      {/* Mensagem de boas vindas diaria */}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingTop: StatusBar.currentHeight,
          paddingBottom: StatusBar.currentHeight / 2,
        }}
      >
        <Text className="text-center text-2xl">
          {mensagem} {user.nome}
        </Text>

        <Text className="text-center text-xl italic font-medium">
          Hoje é {diaSemana}, {dia} de {mes}
        </Text>
      </View>

      {/* Barra de progresso */}
      {/* Procurando pelo firestore */}
      <View className="mt-4">
        <View className="flex-col items-center gap-2 p-2 bg-zinc-400/35 rounded">
          <Text className="text-center text-lg mb-2">
            Seu progresso da semana
          </Text>

          <View className="flex-row gap-3.5">
            {diasSemana.map(({ id, label }) => (
              <View key={id} className="items-center">
                <Lucide
                  name={progresso?.[id] === 1 ? 'circle-check-big' : 'circle'}
                  size={20}
                  color={progresso?.[id] === 1 ? 'green' : '#1f2937'}
                />
                <Text className="capitalize mt-1 text-slate-900">{label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Fazer sistema de flatlist e renderizar a quantidade de treinos,
          baseado na quantidade de vezes escolhida pelo usuario na tela de treino */}

      <CardTreinos />
    </View>
  );
}
