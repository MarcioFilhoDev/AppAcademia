import { StatusBar, Text, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const { user } = useContext(AuthContext);

  const [mensagem, setMensagem] = useState('');

  const [dia, setDia] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [mes, setMes] = useState('');

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
      message();
    }, []),
  );

  return (
    <View className="flex-1">
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
          {diaSemana}, {dia} de {mes}
        </Text>
      </View>
    </View>
  );
}
