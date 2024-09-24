import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    const trimmedNombre = nombre.trim();
    const trimmedContraseña = contraseña.trim();
    if (trimmedNombre === '' || trimmedContraseña === '') {
      setError(true);
      return;
    }
    setError(false);
    router.push('/'); // Navega a la pantalla principal
  };

  return (
    <ImageBackground source={require('@/assets/images/login.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
          />
          <Button title="Ingresar" onPress={handleSubmit} />
          {error && <Text style={styles.error}>Todos los campos son obligatorios</Text>}
          <Pressable onPress={() => router.push('/olvidosucontraseña')}>
            <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  form: {
    width: '20%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4B0082',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: '70%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  forgotPassword: {
    color: 'blue',  // Cambiado a azul
    textAlign: 'center',
    marginTop: 10,
  },
});
