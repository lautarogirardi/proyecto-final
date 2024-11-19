import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import LoginAdmin from '@/components/login/loginAdmin';

// Componente funcional para la pantalla de inicio de sesión de administrador
export default function LoginAdminScreen() {
  return (
    // Imagen de fondo para la pantalla de inicio de sesión de administrador
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.background}>
      {/* Contenedor principal para centrar el contenido */}
      <View style={styles.container}>
        <LoginAdmin /> {/* Usamos el componente de LoginAdmin */}
      </View>
    </ImageBackground>
  );
}

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Estilo para la imagen de fondo */
  background: {
    flex: 1,
    resizeMode: 'cover',  // Esta propiedad determina cómo se redimensionará la imagen
    width: '100%',  // Expande la imagen a todo el ancho de la pantalla
    height: '100%', // Expande la imagen a toda la altura de la pantalla
  },
  /* Estilo para el contenedor principal */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
});
