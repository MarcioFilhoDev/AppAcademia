import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../constants/colors';

import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigation();

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email === '' || password === '') {
      Alert.alert('Erro.', 'Preencha os dados corretamente.');
      return;
    }

    await signIn(email, password);
  }

  return (
    <TouchableWithoutFeedback
      className="flex-1"
      onPress={() => Keyboard.dismiss()}
      touchSoundDisabled={true}
    >
      <View className="flex-1 justify-center items-center bg-neutral-200">
        <View className="w-4/5">
          <Text className="text-xl font-semibold color-neutral-800 mb-5">
            Faça o login
          </Text>

          <View className="gap-3">
            {/* Campo do email */}
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={'#888'}
              className="bg-neutral-100 pl-4 py-4 rounded text-lg elevation-sm"
              value={email}
              onChangeText={text => setEmail(text)}
              style={{ color: colors.input }}
            />

            {/* Campo da senha */}
            <TextInput
              placeholder="Senha"
              placeholderTextColor={'#888'}
              className="bg-neutral-100 pl-4 py-4 rounded text-lg elevation-sm"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={text => setPassword(text)}
              style={{ color: colors.input }}
            />

            {/*  */}
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

            {/* Botao de login */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.7}
              style={{ backgroundColor: colors.primary }}
              className="py-3 rounded justify-center items-center elevation"
            >
              <Text className="text-xl font-semibold color-white">
                Acessar conta
              </Text>
            </TouchableOpacity>

            {/* Botao de cadastro */}
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
