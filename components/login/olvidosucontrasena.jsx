import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig'; 
import { sendPasswordResetEmail } from 'firebase/auth';

export default function OlvidoSuContraseña() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  const handlePasswordRecovery = () => {
    if (email.trim() === '') {
      setModalMessage('Por favor ingrese su correo electrónico');
      setModalVisible(true);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      })
      .catch(error => {
        console.log(error);
        setModalMessage(error.message);
        setModalVisible(true);
      });
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
        <TouchableOpacity style={styles.recoverButton} onPress={handlePasswordRecovery}>
          <Text style={styles.buttonText}>Recuperar Contraseña</Text>
        </TouchableOpacity>
        {message && <Text style={styles.message}>{message}</Text>}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>

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
  form: {
    width: '90%',
    padding: 35,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  recoverButton: {
    backgroundColor: '#4CAF50',
    padding: 9,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 9,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  message: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
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
});
