import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import LoginForm from '../../components/login/formulario'; // Importamos el componente LoginForm

export default function LoginScreen() {
  return (
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.background}>
      <View style={styles.container}>
        <LoginForm /> {/* Usamos el componente de Login */}
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
});
