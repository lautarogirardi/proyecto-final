import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app'; // Asegúrate de importar el tipo de rutas

export default function Formulario() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSubmit = () => {
    const trimmedNombre = nombre.trim();
    const trimmedContraseña = contraseña.trim();
    if (trimmedNombre === '' || trimmedContraseña === '') {
      setError(true);
      return;
    }
    setError(false);
    navigation.navigate('Home'); // Navega a la pantalla principal
  };

  return (
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
        <Pressable onPress={() => navigation.navigate('OlvidoSuContraseña')}>
          <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  form: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  forgotPassword: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});
