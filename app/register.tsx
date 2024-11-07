import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import RegistroForm from '../components/login/Registro'; 

export default function RegistroScreen() {
  return (
    <ImageBackground source={require('@/assets/images/login.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <RegistroForm /> {/* Usamos el componente RegistroForm */}
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
