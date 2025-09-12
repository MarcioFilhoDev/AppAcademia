import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { use, useContext, useState } from 'react';
import { TreinoContext } from '../../contexts/treinos';
import Video from 'react-native-video';

export default function CardTreinos() {
  const { dados } = useContext(TreinoContext);

  const [playOrPaused, setPlayOrPaused] = useState(true);

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Treinos da Semana</Text>

      <FlatList
        data={dados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 p-3 rounded-lg border border-gray-300">
            <Text className="text-lg font-semibold">{item.nome}</Text>

            {item.exercicios.map((exercicio, idx) => (
              <View key={idx} className="">
                <Text className="text-gray-600">
                  {exercicio.nome} – {exercicio.series}x{exercicio.repeticoes}
                </Text>

                {exercicio.url_video && (
                  <TouchableOpacity
                    className="bg-neutral-500 h-10 w-10"
                    onPress={() => setPlayOrPaused(!!playOrPaused)}
                  >
                    {/* <Video
                      source={{ uri: exercicio.url_video }}
                      style={{ width: 200, height: 100 }}
                      resizeMode="contain"
                      repeat
                      muted
                      paused={playOrPaused}
                      controls={false}
                    /> */}
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}
