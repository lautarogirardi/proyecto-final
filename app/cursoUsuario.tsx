import React from 'react';
import { Text, View } from '@/components/Themed';
import { ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import CursosList from '@/components/curso/hooks/cursoList';

function PantallaCursos() {
  return (
    // Imagen de fondo para la pantalla de cursos
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.backgroundImage}>
      {/* Habilitando el desplazamiento vertical */}
      <ScrollView>
        <View style={styles.container}>
          {/* BlurView para el efecto de desenfoque en el fondo */}
          <BlurView intensity={65} style={styles.blurContainer}>
            {/* Título de la pantalla */}
            <h1 style={styles.title}>Lista de Cursos:</h1>
            {/* Componente CursosList */}
            <View style={styles.informe}>
              <CursosList />
            </View>
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default PantallaCursos;

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Contenedor principal */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  /* Estilo para la imagen de fondo */
  backgroundImage: {
    flex: 1,
    width: '100%',  // Expande la imagen a todo el ancho de la pantalla
    height: '100%', // Expande la imagen a toda la altura de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', 
  },
  /* Estilo para el título */
  title: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', 
  },
  /* Estilo para los textos */
  text: {
    fontFamily: 'arial',
  },
  /* Estilo para los botones */
  boton: {
    backgroundColor: 'lightblue',
    padding: 10,
    color: '#000',
    borderRadius: 40,
    cursor: 'pointer',
    width: 200,
    height: 40,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'arial',
    borderColor: 'lightblue',
    borderWidth: 2,
  },
  /* Estilo para la ubicación de los botones */
  ubicacion: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)', 
  },
  /* Contenedor del desenfoque */
  blurContainer: {
    width: '100%', 
    padding: 20,
    borderRadius: 40,
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderColor: 'lightblue',
    borderWidth: 2,
  },
  /* Contenedor para la lista de cursos */
  informe: {
    marginBottom: 10, 
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  },
  /* Contenedor para las materias */
  materias: {
    marginBottom: 10, 
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  }
});
