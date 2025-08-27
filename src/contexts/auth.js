import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

// Armazenara as informacoes do usuario
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      try {
        const data_user = await AsyncStorage.getItem('@userCredentials');

        // Verificando se existe alguma informacao salva
        if (data_user) {
          // Converte novamente
          setUser(JSON.parse(data_user));
          setLoading(false);
        }
      } catch (error) {
        Alert.alert('Error ao carregar dados do usuário', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadStorage();
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
            nome: name,
            email: email,
            created: new Date(),
          })

          // Se deu certo a criacao dos dados do usuario no firestore
          // Envia os dados do usuario para a variavel user
          .then(async () => {
            // Criando colecao para cada usuario cadastrado
            await firestore().collection('users_week_progress').doc(uid).set({
              domingo: 0,
              segunda: 0,
              terca: 0,
              quarta: 0,
              quinta: 0,
              sexta: 0,
              sabado: 0,
              last_update: new Date(),
            });
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
        const data = await firestore().collection('users').doc(uid).get();

        let result_data = {
          userID: uid,
          nome: data.data().name,
          email: value.user.email,
        };

        // Definindo usuario
        setUser(result_data);

        // Armazenando dados do usuario
        storageUser(result_data);

        // Retirando tela de loading
        setLoading(false);
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
      });

    setLoading(false);
  }

  // Após fazer logout do usuario, apaga os dados do AsyncStorage
  async function removeUserData() {
    await AsyncStorage.removeItem('@userCredentials');
  }

  // Funcao responsavel por fazer logout do usuario
  async function signOut() {
    setLoading(true);
    await auth()
      .signOut()
      .then(() => {
        setUser(null);
        removeUserData();
      })
      .catch(error => {
        Alert.alert('erro', error.message);
      });
    setLoading(false);
  }

  // Funcao responsavel por deletar conta do usuario
  async function deleteAccount() {
    setLoading(true);
    try {
      // Usuário autenticado atual
      const usuario = auth().currentUser;

      if (usuario) {
        // Deleta usuário do Firebase Authentication
        await usuario.delete();

        // Deleta dados do Firestore
        await firestore().collection('users').doc(user.userID).delete();
        await firestore()
          .collection('users_week_progress')
          .doc(user.userID)
          .delete();

        // Limpa sessão
        setUser(null);
        removeUserData();
      } else {
        Alert.alert('Erro', 'Nenhum usuário autenticado encontrado');
      }
    } catch (error) {
      Alert.alert('Erro ao deletar conta', error.message);
    } finally {
      setLoading(false);
    }
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
      value={{
        userSigned: !!user,
        user,
        signUp,
        signIn,
        signOut,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
