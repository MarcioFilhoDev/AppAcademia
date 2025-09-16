import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { TreinoContext } from '../../contexts/treinos';

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
            {/* Nome do treino */}
            <Text className="text-lg font-semibold">{item.nome}</Text>

            <View className="flex-row">
              <ScrollView horizontal contentContainerStyle={{ gap: 4 }}>
                <TouchableOpacity
                  className="bg-neutral-500 h-24 w-24"
                  onPress={() => setPlayOrPaused(!!playOrPaused)}
                />
                <TouchableOpacity
                  className="bg-neutral-500 h-24 w-24"
                  onPress={() => setPlayOrPaused(!!playOrPaused)}
                />
                <TouchableOpacity
                  className="bg-neutral-500 h-24 w-24"
                  onPress={() => setPlayOrPaused(!!playOrPaused)}
                />
                <TouchableOpacity
                  className="bg-neutral-500 h-24 w-24"
                  onPress={() => setPlayOrPaused(!!playOrPaused)}
                />
                <TouchableOpacity
                  className="bg-neutral-500 h-24 w-24"
                  onPress={() => setPlayOrPaused(!!playOrPaused)}
                />
                <TouchableOpacity
                  className="bg-neutral-500 h-24 w-24"
                  onPress={() => setPlayOrPaused(!!playOrPaused)}
                />
              </ScrollView>
            </View>
          </View>
        )}
      />
    </View>
  );
}

{
  /* {exercicio.url_video && (
                  <Video
                    source={{ uri: exercicio.url_video }}
                    style={{ width: 200, height: 100 }}
                    resizeMode="contain"
                    repeat
                    muted
                    paused={playOrPaused}
                    controls={false}
                  />
                )} */
}

// {item.exercicios.map((exercicio, key) => (
//                 <View key={key}>
//                   {/* <Text className="text-gray-600">
//                   {exercicio.nome} – {exercicio.series}x{exercicio.repeticoes}
//                 </Text> */}

//                   <TouchableOpacity
//                     className="bg-neutral-500 h-24 w-24"
//                     onPress={() => setPlayOrPaused(!!playOrPaused)}
//                   />
//                 </View>
//               ))}
