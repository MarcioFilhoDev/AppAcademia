import { Button, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Exercicios() {
  const { signOut, user } = useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <View>
      <Text>Tela exercicios</Text>

      <Text>Usuario: {user.nome}</Text>
      <Text>Usuario: {user.email}</Text>

      <Button onPress={handleSignOut} title="Sair" />
    </View>
  );
}
