import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import LoginAdmin from '@/components/login/loginAdmin'

export default function LoginAdminScreen() {
  return (
    <ImageBackground source={require('@/assets/images/login.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <LoginAdmin /> {/* Usamos el componente de LoginAdmin */}
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
