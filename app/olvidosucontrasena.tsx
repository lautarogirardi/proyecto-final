import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import OlvidoSuContraseña from '../components/login/olvidosucontrasena'; // Importamos el componente OlvidoSuContraseña

export default function OlvidoSuContraseñaScreen() {
  return (
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.background}>
      <View style={styles.container}>
        <OlvidoSuContraseña /> {/* Usamos el componente OlvidoSuContraseña */}
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
