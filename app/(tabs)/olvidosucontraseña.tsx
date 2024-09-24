// olvidosucontraseña.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OlvidoSuContraseña() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handlePasswordRecovery = () => {
    setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  form: {
    width: '38%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  recoverButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  message: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
  },
});
