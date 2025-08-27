import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import { colors } from '../../constants/colors';

export default function FormularioTreino() {
  const [quantidadeTreinos, setQuantidadeTreinos] = useState(0);

  const objetivos = ['Hipertrofia', 'Emagrecimento', 'Condicionamento'];
  const [objetivo, setObjetivo] = useState(null);

  const [dor, setDor] = useState(null);
  const [descricaoDor, setDesricaoDor] = useState('');
  const [alturaCampo, setAlturaCampo] = useState(40);
  const [maxLength, setMaxLengh] = useState(1000);

  function handleSendInformation() {
    if (quantidadeTreinos === 0) {
      Alert.alert(
        'Aviso!',
        'A quantidade de treinos na semana precisa ser maior que 1',
      );
      return;
    } else if (objetivo === null) {
      Alert.alert('Aviso!', 'Selecione uma categoria para seu objetivo.');
      return;
    } else if (dor === null) {
      Alert.alert(
        'Aviso!',
        'Se você não possui dores, deve marcar a opção "Não".',
      );
      return;
    } else if (dor === true) {
      if (descricaoDor === '') {
        Alert.alert(
          'Aviso!',
          'Não é possível enviar os dados se sua descrição for nula.',
        );
        return;
      }
      Alert.alert('Sucesso', 'Seus dados foram enviados para análise.');
    }
  }

  return (
    <View className="h-full">
      <View className="flex-row items-center bg-white p-4 elevation rounded-md">
        <Text className="text-xl">Treinos por semana: </Text>

        <View className="flex-row items-center">
          <TouchableOpacity
            disabled={quantidadeTreinos === 6 ? true : false}
            onPress={() => {
              if (quantidadeTreinos === 6) {
                setQuantidadeTreinos(6);
              } else {
                setQuantidadeTreinos(quantidadeTreinos + 1);
              }
            }}
          >
            <Lucide
              name="circle-plus"
              size={24}
              color={quantidadeTreinos === 6 ? '#999' : colors.primary}
            />
          </TouchableOpacity>

          <TextInput
            className="text-2xl w-12 text-center"
            style={{ color: colors.input }}
            placeholder="0"
            placeholderTextColor={colors.input}
            aria-valuemax={6}
            editable={false}
            value={quantidadeTreinos.toString()}
          />

          <TouchableOpacity
            disabled={quantidadeTreinos === 0 ? true : false}
            onPress={() => {
              if (quantidadeTreinos === 0) {
                setQuantidadeTreinos(0);
              } else {
                setQuantidadeTreinos(quantidadeTreinos - 1);
              }
            }}
          >
            <Lucide
              name="circle-minus"
              size={24}
              color={quantidadeTreinos === 0 ? '#999' : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-2 my-4 bg-white p-4 elevation rounded-md">
        <Text className="text-xl ">Qual seu objetivo?</Text>

        <View className="flex-row justify-between">
          {objetivos.map(objetivosID => {
            const selectedButton = objetivo === objetivosID;

            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#dadada',
                  paddingVertical: 8,
                  paddingHorizontal: 4,
                  elevation: 2,
                  borderWidth: 2,
                  borderColor: selectedButton ? colors.primary : '#dadada',
                  borderRadius: 6,
                }}
                onPress={() => setObjetivo(objetivosID)}
                key={objetivosID}
              >
                <Text>{objetivosID}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="gap-2 bg-white p-4 elevation rounded-md">
        <Text className="text-xl">
          Sente dor ao realizar algum exercício ou movimento?
        </Text>

        <View className="flex-row">
          {['Sim', 'Não'].map(opcao => {
            const selected = dor === opcao; // dor é o estado que você precisa criar
            return (
              <TouchableOpacity
                key={opcao}
                onPress={() => {
                  setDor(opcao);
                  setDesricaoDor('');
                }}
                style={{
                  borderColor: selected ? colors.primary : '#dadada',
                  borderWidth: 2,
                  backgroundColor: '#dadada',
                  width: '50%',
                }}
                className="py-2 rounded-lg items-center border"
              >
                <Text
                  className={`${
                    selected ? 'text-primary font-semibold' : 'text-gray-700'
                  }`}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {dor === 'Sim' ? (
          <View>
            <TextInput
              multiline={true}
              value={descricaoDor}
              maxLength={1000}
              onChangeText={text => {
                setDesricaoDor(text);
                setMaxLengh(maxLength - 1);
              }}
              onContentSizeChange={e =>
                setAlturaCampo(e.nativeEvent.contentSize.height)
              }
              placeholder="Descreva sua dor com detalhes"
              placeholderTextColor={colors.input}
              style={{
                backgroundColor: '#99999940',
                borderRadius: 6,
                marginTop: 4,
                paddingHorizontal: 10,
                height: alturaCampo,
              }}
            />

            {/* 
                Pega o máximo de caracteres e diminui pela quantidade
                já digitada pelo usuario
              */}
            <View className="self-end">
              <Text
                style={{
                  textAlign: 'right',
                  paddingRight: 3,
                  color: '#999',
                  fontSize: 14,
                }}
              >
                {1000 - descricaoDor.length}
              </Text>

              <Text
                style={{
                  textAlign: 'right',
                  paddingRight: 3,
                  color: '#999',
                  fontSize: 14,
                }}
              >
                caracteres restantes
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text> </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSendInformation}
        activeOpacity={0.75}
        style={{
          backgroundColor: colors.primary,
          marginTop: '10%',
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text className="text-center text-lg font-medium">Enviar dados</Text>
      </TouchableOpacity>
    </View>
  );
}
