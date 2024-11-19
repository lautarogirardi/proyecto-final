import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '@/components/curso/boton';  // Tu componente personalizado

// Componente funcional para registrar un nuevo usuario
export default function RegistroForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  // Manejar el registro de usuario
  const handleSignUp = () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      showAlertModal('Por favor llene todos los campos para registrarse');
      return;
    }

    if (password !== confirmPassword) {
      showAlertModal('Por favor asegúrese de que las contraseñas coincidan');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario registrado');
        const user = userCredential.user;
        navigation.navigate("epet20");
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        showAlertModal(error.message);
      });
  };

  // Función para mostrar un mensaje en un modal
  const showAlertModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Crea una cuenta!</Text>   
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
      <TextInput
        placeholder='Confirmar Contraseña'
        style={styles.textInput}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry 
      />
      <CustomButton title="Registrarse" onPress={handleSignUp} />

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
