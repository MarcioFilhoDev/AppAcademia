import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { TreinoContext } from '../../contexts/treinos';

export default function CardTreinos() {
  const { dados } = useContext(TreinoContext);

  const [playOrPaused, setPlayOrPaused] = useState(true);

  function resgtandoTumbnailVideo(url) {
    //  Verificando se o link é do navegador
    if (url.includes('watch?v=')) {
      url = url.split('watch?v=')[1].split('&')[0];
    }
    //  Verificando se o link esta "cortado"
    else if (url.includes('youtu.be/')) {
      url = url.split('youtu.be/')[1].split('?')[0];
    }
    //  Verificando se é um shorts
    else if (url.includes('/shorts/')) {
      url = url.split('/shorts/')[1].split('?')[0];
    }

    if (!url) return null;

    return `https://img.youtube.com/vi/${url}/hqdefault.jpg`;
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Treinos da Semana</Text>

      <FlatList
        data={dados}
        keyExtractor={index => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 p-3 rounded-lg border border-gray-300">
            <Text className="text-lg font-semibold mb-2">{item.nome}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.exercicios.map((exercicio, key) => (
                <View key={key} className="mr-4">
                  <Text className="font-semibold mb-1">{exercicio.nome}</Text>
                  <Image
                    className="w-40 h-40 rounded-xl"
                    source={{ uri: resgtandoTumbnailVideo(exercicio.videoUrl) }}
                  />
                  <Text className="text-gray-600 mt-1">
                    {exercicio.series}x{exercicio.repeticoes}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
}
