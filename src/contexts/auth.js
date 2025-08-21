import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

// Armazenara as informacoes do usuario
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadStorage() {
      const data_user = await AsyncStorage.getItem('@userCredentials');

      // Verificando se existe alguma informacao salva
      if (data_user) {
        // Converte novamente
        setUser(JSON.parse(data_user));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
    setLoading(false);
  }, []);

  // Funcao que salva todas as informacoes ao ser chamada
  async function storageUser(data) {
    // Converte o data em uma string
    await AsyncStorage.setItem('@userCredentials', JSON.stringify(data));
  }

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
          .collection('users')
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
            storageUser(data);
          });
      })

      // Se deu errado executa catch
      .catch(error => {
        console.log('Error', error.message);
      });

    setLoading(false);
  }

  // Funcao que faz login dos usuarios
  async function signIn(email, password) {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        // Buscando no bd os dados do usuario
        const user_data = await firestore().collection('users').doc(uid).get();

        // console.log(user_data);

        let result_data = {
          userID: uid,
          nome: user_data.data().user_name,
          email: value.user.email,
        };

        // Definindo usuario
        setUser(result_data);

        // Armazenando dados do usuario
        storageUser(result_data);

        // Retirando tela de loading
        setLoading(false);
      });

    setLoading(false);
  }

  // Funcao que faz logout dos usuarios
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
      value={{ userSigned: !!user, user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
