import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        navigation.navigate("epet20");
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const HandleSignIn = () => {
    if (email.trim() === '' || password.trim() === '') {
      setModalMessage('Por favor llene los espacios para poder iniciar sesión de su cuenta');
      setModalVisible(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('Sesión iniciada');
        const user = userCredential.user;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate("epet20");
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        switch (error.message) {
          case "Firebase: Error (auth/invalid-login-credentials).":
            setModalMessage("No existe la cuenta.");
            break;
          default:
            setModalMessage(error.message);
            break;
        }
        setModalVisible(true);
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate("olvidosucontrasena");
  };

  const direccionRegistro = () => {
    navigation.navigate("register");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicia sesión</Text>
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Contraseña'
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Text style={styles.olvideContra} onPress={handleForgotPassword}>Olvidé la Contraseña</Text>
      <TouchableOpacity style={styles.boton} onPress={HandleSignIn}>
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.registrate}>¿No tienes una cuenta? </Text>
      <TouchableOpacity style={styles.boton2} onPress={direccionRegistro}>
        <Text style={styles.textoBoton}>Regístrate</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            style={[styles.boton, styles.botonCerrar]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textoBoton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  olvideContra: {
    color: 'blue',
    marginVertical: 10,
  },
  boton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
  },
  registrate: {
    marginVertical: 10,
  },
  boton2: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 1,
    textAlign: 'center',
  },
  botonCerrar: {
    backgroundColor: '#f44336',
  },
});
