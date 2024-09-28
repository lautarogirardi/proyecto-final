import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Import the auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegistroForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Datos no ingresados', 'Por favor llene todos los campos para registrarse');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Contraseñas no coinciden', 'Por favor asegúrese de que las contraseñas coincidan');
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
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>crea una cuenta!</Text>   
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Contraseña'
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Agrega esta línea para ocultar la contraseña
      />
      <TextInput
        placeholder='Confirmar Contraseña'
        style={styles.textInput}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry // Agrega esta línea para ocultar la contraseña
      />
      <TouchableOpacity style={styles.boton} onPress={handleSignUp}>
        <Text style={styles.textoBoton}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  textInput: {
    width: '80%',
    height: 39,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 9,
    paddingLeft: 8,
    borderRadius: 5,
  },
  boton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 9,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
