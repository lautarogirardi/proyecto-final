import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import CustomButton from '@/components/curso/boton';  // Tu componente personalizado

// Componente funcional para recuperar la contraseña
export default function OlvidoSuContraseña() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  // Manejar la recuperación de contraseña
  const handlePasswordRecovery = () => {
    if (email.trim() === '') {
      showAlertModal('Por favor ingrese su correo electrónico');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
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
      <View style={styles.form}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <CustomButton title="Recuperar Contraseña" onPress={handlePasswordRecovery} />
        {message && <Text style={styles.message}>{message}</Text>}
        <CustomButton title="Volver" onPress={() => navigation.goBack()} />
      </View>

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
  /* Formulario */
  form: {
    width: '90%',
    padding: 35,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  /* Estilo para el título */
  title: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  /* Estilo para los campos de entrada de texto */
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  /* Estilo para los mensajes */
  message: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
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
