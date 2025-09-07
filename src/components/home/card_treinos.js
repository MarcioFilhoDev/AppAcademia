import { FlatList, Image, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { TreinoContext } from '../../contexts/treinos';

export default function CardTreinos() {
  const { dados } = useContext(TreinoContext);

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Treinos da Semana</Text>

      <FlatList
        data={dados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 p-3 rounded-lg border border-gray-300">
            <Text className="text-lg font-semibold">{item.nome}</Text>

            {item.exercicios.map((ex, idx) => (
              <View key={idx} className="mb-2">
                <Text className="text-gray-600">
                  {ex.nome} – {ex.series}x{ex.repeticoes}
                </Text>

                {ex.url_gif && (
                  <Image
                    source={{ uri: ex.url_gif }}
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                  />
                )}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}
