import React, { useState } from 'react';
import { Text, View, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import CursoAdd from '@/components/curso/hooks/cursoAdd';
import ActualizarCurso from '@/components/curso/hooks/actualizarCurso';
import EliminarCurso from '@/components/curso/hooks/eliminarCurso';
import CursosList from '@/components/curso/hooks/cursoList';
import AsignarCurso from '@/components/curso/asignarCurso';
import AsignarProfesor from '@/components/curso/asignarProfesor';
import AsignarMateria from '@/components/curso/asisgnarMateria';
import AsignarPreceptor from '@/components/curso/asignarPreceptor';
import { BlurView } from 'expo-blur';

interface Section {
  id: number;
  name: string;
}

const Curso: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>({ id: 1, name: 'agregar' });

  // Función para manejar el clic en los botones y cambiar la sección activa
  const handleButtonClick = (section: Section) => {
    setActiveSection(section);
  };

  return (
    // Imagen de fondo para la pantalla de gestión de cursos
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.backgroundImage}>
      {/* Habilitando el desplazamiento vertical */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* BlurView para el efecto de desenfoque en el fondo */}
          <BlurView intensity={65} style={styles.blurContainer}>
            {/* Título de la pantalla */}
            <Text style={styles.title}>Gestionar Cursos</Text>

            {/* Botones para seleccionar la sección activa */}
            <View style={styles.ubicacion}>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 1, name: 'agregar' })} style={styles.boton}>
                <Text style={styles.botonText}>Agregar Curso</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 2, name: 'actualizar' })} style={styles.boton}>
                <Text style={styles.botonText}>Actualizar Curso</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 3, name: 'eliminar' })} style={styles.boton}>
                <Text style={styles.botonText}>Eliminar Curso</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 4, name: 'lista' })} style={styles.boton}>
                <Text style={styles.botonText}>Lista de Cursos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 5, name: 'asignar' })} style={styles.boton}>
                <Text style={styles.botonText}>Asignar Alumnos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 6, name: 'asignarProfesor' })} style={styles.boton}>
                <Text style={styles.botonText}>Asignar Profesores</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 7, name: 'asignarMateria' })} style={styles.boton}>
                <Text style={styles.botonText}>Asignar Materias</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick({ id: 8, name: 'asignarPreceptor' })} style={styles.boton}>
                <Text style={styles.botonText}>Asignar Preceptores</Text>
              </TouchableOpacity>
            </View>

            {/* Renderizado condicional del componente correspondiente a la sección activa */}
            {activeSection.name === 'agregar' && (
              <View style={styles.component}><CursoAdd /></View>
            )}
            {activeSection.name === 'actualizar' && (
              <View style={styles.component}><ActualizarCurso /></View>
            )}
            {activeSection.name === 'eliminar' && (
              <View style={styles.component}><EliminarCurso /></View>
            )}
            {activeSection.name === 'lista' && (
              <View style={styles.component}><CursosList /></View>
            )}
            {activeSection.name === 'asignar' && (
              <View style={styles.component}><AsignarCurso /></View>
            )}
            {activeSection.name === 'asignarProfesor' && (
              <View style={styles.component}><AsignarProfesor /></View>
            )}
            {activeSection.name === 'asignarMateria' && (
              <View style={styles.component}><AsignarMateria /></View>
            )}
            {activeSection.name === 'asignarPreceptor' && (
              <View style={styles.component}><AsignarPreceptor /></View>
            )}
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Curso;

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Contenedor principal */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  /* Contenedor del ScrollView */
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 24,
    marginBottom: 20,
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
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  botonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
  /* Contenedor para los botones */
  ubicacion: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  /* Estilo adicional */
  elegir: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  /* Contenedor para los componentes */
  component: {
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    paddingHorizontal: 20,
  },
});
