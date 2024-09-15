import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Switch, View, Button } from 'react-native';
import { useState } from 'react';

import { Text } from '@/components/Themed';

export default function ModalScreen() {
  // Estado para almacenar la preferencia de modo oscuro
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de usuario</Text>

      {/* Menú de configuración de usuario */}
      <View style={styles.menuContainer}>
        {/* Botón para actualizar el nombre de usuario */}
        <View style={styles.buttonContainer}>
          <Button title="Cambiar nombre de usuario" onPress={() => console.log('Actualizando nombre de usuario')} />
        </View>

        {/* Espacio entre botones */}
        <View style={{ marginVertical: 10 }} />

        {/* Botón para actualizar la contraseña */}
        <View style={styles.buttonContainer}>
          <Button title="Cambiar contraseña" onPress={() => console.log('Actualizando contraseña')} />
        </View>

        {/* Espacio entre botones */}
        <View style={{ marginVertical: 10 }} />

        {/* Etiqueta y switch para el modo oscuro */}
        <Text style={styles.menuLabel}>Modo oscuro:</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => setDarkMode(value)}
        />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Eliminé el condicional para el modo oscuro
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  menuContainer: {
    marginVertical: 20,
  },
  menuLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10, // Agregué un margen vertical a los botones
  },
});