import React from 'react';
import { View, StyleSheet } from 'react-native';
import Formulario from '@/components/formulario';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Formulario />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
