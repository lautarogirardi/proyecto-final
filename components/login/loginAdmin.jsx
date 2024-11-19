import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '@/components/curso/boton';  // Tu componente personalizado

// Componente funcional para iniciar sesión como administrador
export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Verificar si el usuario ya ha iniciado sesión
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('adminUser');
      if (user) {
        navigation.navigate("admin");
      }
      setLoading(false);
    };
    checkUser();
  }, [navigation]);

  // Manejar el inicio de sesión
  const HandleSignIn = () => {
    if (email.trim() === '' || password.trim() === '') {
      showAlertModal('Por favor llene los espacios para poder iniciar sesión de su cuenta');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('Sesión iniciada');
        const user = userCredential.user;
        await AsyncStorage.setItem('adminUser', JSON.stringify(user));
        navigation.navigate("admin");
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        switch (error.message) {
          case "Firebase: Error (auth/invalid-login-credentials).":
            showAlertModal("No existe la cuenta.");
            break;
          default:
            showAlertModal(error.message);
            break;
        }
      });
  };

  // Función para mostrar un mensaje en un modal
  const showAlertModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicia sesión como Admin</Text>
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='Contraseña'
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        value={password}
      />
      <CustomButton title="Iniciar sesión" onPress={HandleSignIn} />

      {/* Modal para mostrar mensajes de error o información */}
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
    </View>
  );
}

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
  /* Contenedor del modal */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  /* Estilo de la vista del modal */
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
