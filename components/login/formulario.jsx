import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '@/components/curso/boton';  

// Componente funcional para el formulario de inicio de sesión
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
  }, [navigation]);

  // Manejar el inicio de sesión
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

  // Manejar la navegación para olvidar contraseña
  const handleForgotPassword = () => {
    navigation.navigate("olvidosucontrasena");
  };

  // Manejar la navegación para registro
  const direccionRegistro = () => {
    navigation.navigate("register");
  };

  // Manejar la navegación para login de admin
  const handleAdminLogin = () => {
    navigation.navigate("loginAdmin");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.titulo}>Inicia sesión</Text>
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        autoFocus
        value={email}
      />
      <TextInput
        placeholder='Contraseña'
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        value={password}
      />
      <Text style={styles.olvideContra} onPress={handleForgotPassword}>Olvidé la Contraseña</Text>
      <CustomButton title="Iniciar sesión" onPress={HandleSignIn} />
      <Text style={styles.registrate}>¿No tienes una cuenta? </Text>
      <CustomButton title="Regístrate" onPress={direccionRegistro} />
      <Text style={styles.adminLogin} onPress={handleAdminLogin}>Admin Login</Text>

      {/* Modal para mostrar mensajes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <CustomButton title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Contenedor principal */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  /* Contenedor de carga */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Estilo para el título */
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  /* Estilo para los campos de entrada de texto */
  textInput: {
    width: '80%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  /* Estilo para el texto de olvidar contraseña */
  olvideContra: {
    color: '#007BFF',
    marginVertical: 10,
    textAlign: 'center',
  },
  /* Estilo para el texto de registrarse */
  registrate: {
    marginVertical: 10,
    textAlign: 'center',
  },
  /* Estilo para el texto de login de admin */
  adminLogin: {
    color: '#DC3545',
    marginVertical: 10,
    textAlign: 'center',
  },
  /* Estilos para el modal */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
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
  /* Estilo del texto en el modal */
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
