import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Button, ImageBackground } from 'react-native';
import { Text } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Perfil de Usuario</Text>

          {/* Menú de configuración de usuario */}
          <View style={styles.menuContainer}>
            {/* Botón para actualizar el nombre de usuario */}
            <View style={styles.buttonContainer}>
              <Button title="Cambiar nombre de usuario" onPress={() => console.log('Actualizando nombre de usuario')} color="#4B0082" />
            </View>

            {/* Espacio entre botones */}
            <View style={{ marginVertical: 10 }} />

            {/* Botón para actualizar la contraseña */}
            <View style={styles.buttonContainer}>
              <Button title="Cambiar contraseña" onPress={() => console.log('Actualizando contraseña')} color="#4B0082" />
            </View>
          </View>
        </View>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: '80%',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  menuContainer: {
    width: '100%',
  },
  buttonContainer: {
    marginVertical: 10,
    backgroundColor: '#4B0082',
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    color: '#fff',
  },
});
