import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useCallback, useContext, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { colors } from '../../constants/colors';

import Formulario from '../../components/perfil/formulario';
import CardProfile from '../../components/perfil/card_profile';
import Lucide from '@react-native-vector-icons/lucide';

export default function Profile() {
  const { signOut, deleteAccount } = useContext(AuthContext);

  const [formulario, setFormulario] = useState(false);
  const [extraButtons, setExtraButtons] = useState(false);

  const anim = useRef(new Animated.Value(0)).current; // controrla aparição

  function handleSignOut() {
    Alert.alert('Você está prestes a sair.', 'Quer mesmo sair da sua conta?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: async () => await signOut(),
      },
    ]);
  }

  function handleDeleteAccount() {
    Alert.alert(
      'Você quer excluir sua conta?',
      'Você perderá todos os seus dados.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar conta',
          onPress: async () => await deleteAccount(),
        },
      ],
    );
  }

  function toggleExtraButtons() {
    if (!extraButtons) {
      setExtraButtons(true);
      Animated.spring(anim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setExtraButtons(false));
    }
  }

  useFocusEffect(
    useCallback(() => {
      // Executado quando entra na tela

      return () => {
        // Executado quando sai da tela
        setFormulario(false);
      };
    }, []),
  );

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss;
        setFormulario(false);
      }}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-200">
        {/* Header com imagem de fundo */}
        <View className="h-40 items-end p-4 bg-orange-400">
          <View className="flex-row-reverse gap-4">
            {/* Open buttons list */}
            <TouchableOpacity
              onPress={toggleExtraButtons}
              activeOpacity={0.75}
              className="w-12 h-12 bg-white rounded-full items-center justify-center elevation"
            >
              <Lucide name="settings" size={30} color={colors.primary} />
            </TouchableOpacity>

            {extraButtons ? (
              <Animated.View
                className="flex-row-reverse gap-4"
                style={{
                  transform: [
                    {
                      translateX: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [65, 0], // começa deslocado
                      }),
                    },
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.00001, 1], // vem crescendo
                      }),
                    },
                  ],
                }}
              >
                {/* Log-out button */}
                <TouchableOpacity
                  onPress={handleSignOut}
                  activeOpacity={0.75}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center elevation"
                >
                  <Lucide name="log-out" size={24} color={colors.primary} />
                </TouchableOpacity>

                {/* Delete account button */}
                <TouchableOpacity
                  onPress={handleDeleteAccount}
                  activeOpacity={0.75}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center elevation"
                >
                  <Lucide name="trash-2" size={24} color={colors.primary} />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <View>{}</View>
            )}
          </View>
        </View>

        {/* Card principal */}
        <CardProfile abrirFormulario={() => setFormulario(true)} />

        {/* Formulario */}
        {formulario ? (
          <Formulario fecharFormulario={() => setFormulario(false)} />
        ) : (
          <View>
            <Text> </Text>
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
