import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Import the auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const HandleSignIn = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Datos no ingresados', 'Por favor llene los espacios para poder iniciar sesión de su cuenta');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sesión iniciada');
        const user = userCredential.user;
        navigation.navigate("epet20");
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        switch (error.message) {
          case "Firebase: Error (auth/invalid-login-credentials).":
            Alert.alert("No existe la cuenta.");
            break;
          default:
            Alert.alert("Error", error.message);
            break;
        }
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate("olvidosucontrasena");
  };

  const direccionRegistro = () => {
    navigation.navigate("register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicia sesion</Text>
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
      <Text style={styles.olvideContra} onPress={handleForgotPassword}>Olvidé la Contraseña</Text>
      <TouchableOpacity style={styles.boton} onPress={HandleSignIn}>
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.registrate}>¿No tienes una cuenta? </Text>
      <TouchableOpacity style={styles.boton2} onPress={direccionRegistro}>
        <Text style={styles.textoBoton}>Registrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#fff', // Establece el color de fondo del contenedor a blanco
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos verticalmente
    padding: 20, // Añade un padding de 20 unidades alrededor del contenedor
  },
  titulo: {
    fontSize: 23, // Establece el tamaño de la fuente a 24 unidades
    fontWeight: 'bold', // Hace que el texto sea negrita
    marginBottom: 5, // Añade un margen inferior de 20 unidades
  },
  textInput: {
    width: '80%', // Establece el ancho del campo de texto al 90% del contenedor
    height: 50, // Establece la altura del campo de texto a 40 unidades
    borderColor: 'gray', // Establece el color del borde a gris
    borderWidth: 2, // Establece el ancho del borde a 1 unidad
    marginBottom: 3, // Añade un margen inferior de 10 unidades
    paddingLeft: 20, // Añade un padding izquierdo de 8 unidades
    borderRadius: 5, // Redondea las esquinas del campo de texto con un radio de 5 unidades
  },
  olvideContra: {
    color: 'blue', // Establece el color del texto a azul
    marginBottom: 1, // Añade un margen inferior de 20 unidades
    textDecorationLine: 'underline', // Añade una línea subrayada al texto
  },
  boton: {
    backgroundColor: 'blue', // Establece el color de fondo del botón a azul
    padding: 10, // Añade un padding de 15 unidades dentro del botón
    borderRadius: 4, // Redondea las esquinas del botón con un radio de 5 unidades
    width: '60%', // Establece el ancho del botón al 90% del contenedor
    alignItems: 'center', // Centra el texto del botón horizontalmente
    marginBottom: 0.0, // Añade un margen inferior de 10 unidades
  },
  textoBoton: {
    color: 'white', // Establece el color del texto del botón a blanco
    fontWeight: 'bold', // Hace que el texto del botón sea negrita
  },
  registrate: {
    marginTop: 10, // Añade un margen superior de 20 unidades
    marginBottom: 0.0, // Añade un margen inferior de 10 unidades
  },
  boton2: {
    backgroundColor: 'green', // Establece el color de fondo del botón a verde
    padding: 10, // Añade un padding de 15 unidades dentro del botón
    borderRadius: 4, // Redondea las esquinas del botón con un radio de 5 unidades
    width: '60%', // Establece el ancho del botón al 90% del contenedor
    alignItems: 'center', // Centra el texto del botón horizontalmente
  },
});
