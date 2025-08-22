import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore';

import Lucide from '@react-native-vector-icons/lucide';

export default function Home() {
  const { user } = useContext(AuthContext);

  // Responsaveis por mostrar a mensagem de boas vidas
  const [mensagem, setMensagem] = useState('');
  const [dia, setDia] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [mes, setMes] = useState('');

  const [progresso, setProgresso] = useState({});

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

      // Carrega o progresso do usuario
      async function carregarProgresso() {
        const data = await firestore()
          .collection('users_week_progress')
          .doc(user.userID)
          .get();

        setProgresso(data.data());
      }

      message();
      carregarProgresso();
    }, [user.userID]),
  );

  // Marcando ou desmarcando o dia
  async function toggleDia(dia) {
    // Se o valor atual é 1 então passa para 0, e vice e versa
    const alterandoValor = progresso[dia] === 1 ? 0 : 1;

    await firestore()
      .collection('users_week_progress')
      .doc(user.userID)
      .update({
        [dia]: alterandoValor,
        last_update: new Date(),
      });

    setProgresso(prev => ({
      ...prev,
      [dia]: alterandoValor,
    }));
  }

  return (
    <View className="flex-1">
      {/* Mensagem de boas vindas diaria */}
      <View
        className="bg-orange-400"
        style={{
          paddingTop: StatusBar.currentHeight / 2,
          paddingBottom: StatusBar.currentHeight / 2,
        }}
      >
        <Text className="text-center text-xl">
          {mensagem} {user.nome}
        </Text>

        <Text className="text-center text-xl italic font-medium">
          Hoje é {diaSemana}, {dia} de {mes}
        </Text>
      </View>

      {/* Barra de progresso */}
      {/* Procurando pelo firestore */}
      <View className="bg-zinc-200 mt-4 p-4 mx-3 rounded elevation">
        <Text className="text-center text-lg mb-4">
          Confira seu progresso da semana
        </Text>

        <View className="flex-row justify-center gap-3  ">
          {[
            'domingo',
            'segunda',
            'terca',
            'quarta',
            'quinta',
            'sexta',
            'sabado',
          ].map(diaID => {
            return (
              <TouchableOpacity
                key={diaID}
                onPress={() => toggleDia(diaID)}
                className="items-center"
              >
                <Lucide
                  name={progresso[diaID] === 1 ? 'circle-check-big' : 'circle'}
                  size={20}
                  color={progresso[diaID] === 1 ? 'green' : '#1f2937'}
                />
                <Text className="capitalize mt-1 text-slate-900">{diaID}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
