import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../constants/colors';

// Utilizar icons
import Feather from 'react-native-vector-icons/Feather';

// Contexto que gerencia a parte de autenticacao
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigation();

  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSignUp() {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      Alert.alert('Erro.', 'Preencha os dados corretamente.');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Erro.', 'As senhas não coincidem.');
      return;
    }

    await signUp(email, password, name);

    // Retornando os campos para nulos
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    return;
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
            Cadastre-se
          </Text>

          <View className="gap-3">
            <TextInput
              placeholder="Digite seu nome"
              className="bg-neutral-100 pl-4 py-4 rounded text-lg"
              value={name}
              onChangeText={text => setName(text)}
              maxLength={20}
              placeholderTextColor={'#888'}
              style={{ color: colors.input }}
            />

            <TextInput
              placeholder="Digite seu e-mail"
              className="bg-neutral-100 pl-4 py-4 rounded text-lg"
              value={email}
              onChangeText={text => setEmail(text)}
              maxLength={60}
              placeholderTextColor={'#888'}
              style={{ color: colors.input }}
            />

            <TextInput
              placeholder="Digite sua senha"
              className="bg-neutral-100 pl-4 py-4 rounded text-lg"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={text => setPassword(text)}
              maxLength={20}
              placeholderTextColor={'#888'}
              style={{ color: colors.input }}
            />

            <TextInput
              placeholder="Confirme a senha"
              className="bg-neutral-100 pl-4 py-4 rounded text-lg ring-blue-950"
              secureTextEntry={!showPass}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              maxLength={20}
              placeholderTextColor={'#888'}
              style={{ color: colors.input }}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center gap-0.5"
              onPress={() => setShowPass(!showPass)}
            >
              <Feather name={showPass ? 'check-square' : 'square'} size={16} />
              <Text>{showPass ? 'Ocultar' : 'Mostrar'} senhas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignUp}
              activeOpacity={0.7}
              className="bg-orange-400 py-3 rounded justify-center items-center elevation"
            >
              <Text className="text-xl font-semibold color-white">
                Criar conta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Text className="text-center">
                Já possui uma conta? Faça o login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
