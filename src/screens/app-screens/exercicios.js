import { Button, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Exercicios() {
  const { signOut } = useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <View>
      <Text>Tela exercicios</Text>

      <Button onPress={handleSignOut} title="Deslogar" />
    </View>
  );
}
