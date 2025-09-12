import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import { colors } from '../../constants/colors';
import { TreinoContext } from '../../contexts/treinos';

export default function FormularioTreino({ fechar }) {
  const { salvandoRequisicao } = useContext(TreinoContext);

  const [quantidadeTreinos, setQuantidadeTreinos] = useState(1);

  const objetivos = ['Hipertrofia', 'Emagrecimento', 'Condicionamento'];
  const [objetivo, setObjetivo] = useState(null);

  const [dor, setDor] = useState(null);
  const [descricaoDor, setDesricaoDor] = useState('');

  const [alturaCampo, setAlturaCampo] = useState(40);
  const [maxLength, setMaxLengh] = useState(1000);

  function handleSendInformation() {
    if (quantidadeTreinos === 1) {
      Alert.alert(
        'Aviso!',
        'A quantidade de treinos na semana precisa ser maior que 1',
      );
      return;
    }

    if (objetivo === null) {
      Alert.alert('Aviso!', 'Selecione uma categoria para seu objetivo.');
      return;
    }

    if (dor === null) {
      Alert.alert(
        'Aviso!',
        'Se você não possui dores, deve marcar a opção "Não".',
      );
      return;
    }

    if (dor === 'Sim' && descricaoDor === '') {
      Alert.alert(
        'Aviso!',
        'Não é possível enviar os dados se sua descrição for nula.',
      );
      return;
    }

    // Envia os dados para firestore e fecha o formulario
    salvandoRequisicao(quantidadeTreinos, objetivo, dor, descricaoDor);

    // Reset nos valores
    setObjetivo(null);
    setQuantidadeTreinos(1);
    setDor(null);
    setDesricaoDor('');
    fechar();
  }

  function handleCancel() {
    fechar();
  }

  return (
    <ScrollView className="h-full">
      <View className="gap-6 pb-6">
        {/* Quantidade de treinos por semana */}
        <View className="flex-row items-center bg-white p-4 elevation rounded-md">
          <Text className="text-xl">Treinos por semana: </Text>

          <View className="flex-row items-center">
            {/* Botão aumentar quantidade de treinos */}
            <TouchableOpacity
              disabled={quantidadeTreinos === 1 ? true : false}
              onPress={() => {
                if (quantidadeTreinos === 1) {
                  setQuantidadeTreinos(1);
                } else {
                  setQuantidadeTreinos(quantidadeTreinos - 1);
                }
              }}
            >
              <Lucide
                name="circle-minus"
                size={24}
                color={quantidadeTreinos === 1 ? '#999' : colors.primary}
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

            {/* Botão reduzir quantidade de treinos */}
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
          </View>
        </View>

        {/* Definindo objetivo */}
        <View className="gap-2 bg-white p-4 elevation rounded-md">
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

        {/* Descrevendo dores */}
        <View className="gap-2 bg-white p-4 elevation rounded-md">
          <Text className="text-xl">
            Sente dor ao realizar algum exercício ou movimento?
          </Text>

          <View className="flex-row w-full justify-between">
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
                    backgroundColor: '#dadada',
                  }}
                  className={`py-2 rounded-lg items-center w-5/12 mx-4 border-2 elevation-sm`}
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
                className="rounded-md mt-1 px-3 bg-gray-400/30"
                style={{
                  height: alturaCampo,
                }}
              />

              {/* 
                Pega o máximo de caracteres e diminui pela quantidade
                já digitada pelo usuario
              */}
              <View className="self-end">
                <Text
                  className="text-sm text-right"
                  style={{
                    paddingRight: 3,
                    color: '#999',
                  }}
                >
                  {1000 - descricaoDor.length}
                </Text>

                <Text
                  className="text-sm text-right"
                  style={{
                    paddingRight: 3,
                    color: '#999',
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

        {/* Botão para enviar os dados */}
        <TouchableOpacity
          onPress={handleSendInformation}
          activeOpacity={0.75}
          className="py-3 rounded-lg"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <Text className="text-center text-lg font-medium">Enviar dados</Text>
        </TouchableOpacity>

        {/* Botão para cancelar */}
        <TouchableOpacity
          onPress={handleCancel}
          className="bg-white p-4 rounded elevation-sm"
        >
          <Text className="text-base">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
