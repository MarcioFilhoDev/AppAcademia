import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

export default function SignIn() {
  const navigate = useNavigation();

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback
      className="flex-1"
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled={true}
    >
      <View className="flex-1 justify-center items-center bg-neutral-200">
        <View className="w-4/5">
          <Text className="text-xl font-semibold color-neutral-800 mb-5">
            Faça login
          </Text>

          <View className="gap-3">
            <TextInput
              placeholder="E-mail"
              className="bg-neutral-100 pl-4 py-4 rounded text-lg "
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <TextInput
              placeholder="Senha"
              className="bg-neutral-100 pl-4 py-4 rounded text-lg"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <View className="flex-row justify-between mb-1">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row items-center gap-0.5"
                onPress={() => setShowPass(!showPass)}
              >
                <Feather
                  name={showPass ? 'check-square' : 'square'}
                  size={16}
                />
                <Text>{showPass ? 'Ocultar' : 'Mostrar'} senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigate.navigate('ResetPassword')}
              >
                <Text>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-orange-400 py-3 rounded justify-center items-center elevation"
            >
              <Text className="text-xl font-semibold color-white">
                Acessar conta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate.navigate('SignUp')}
              activeOpacity={0.7}
            >
              <Text className="text-center">
                Não possui uma conta? Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
