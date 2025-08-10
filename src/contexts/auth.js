import React, { createContext, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Funcao que registra/cadastra usuarios
  async function signUp(email, password, name) {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      // Se deu certo executa then
      .then(async value => {
        let uid = value.user.uid;

        // Cadastrando informacoes adicionais do usuario no bd
        await firestore()
          .collection('users-info')
          .doc(uid)
          .set({
            user_name: name,
            user_email: email,
            created: new Date(),
          })
          // Se deu certo a criacao dos dados do usuario no firestore
          // Envia os dados do usuario para
          .then(() => {
            let data = {
              userID: uid,
              nome: name,
              email: value.user.email,
            };

            setUser(data);
          });
      })

      // Se deu errado executa catch
      .catch(error => {
        console.log('Error', error.message);
      });

    setLoading(false);
  }

  async function signIn(email, password) {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        // Buscando no bd os dados do usuario
        const user_data = await firestore()
          .collection('users-info')
          .doc(uid)
          .get();

        // console.log(user_data);

        let result_data = {
          userID: uid,
          nome: user_data.data().user_name,
          email: value.user.email,
        };

        setUser(result_data);
        setLoading(false);
      });

    setLoading(false);
  }

  // Funcao que faz login dos usuarios
  async function signOut() {
    setLoading(true);
    await auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
    setLoading(false);
  }

  // Responsavel por adicionar carregamento
  if (loading) {
    return (
      <View className="flex-1 bg-neutral-200 justify-center items-center">
        <ActivityIndicator size={'large'} color={'orange'} />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ userSigned: !!user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
