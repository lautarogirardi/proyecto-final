import React, { useState } from 'react';
import { Text, View, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import CursoAdd from '@/components/curso/hooks/cursoAdd';
import ActualizarCurso from '@/components/curso/hooks/actualizarCurso';
import EliminarCurso from '@/components/curso/hooks/eliminarCurso';
import CursosList from '@/components/curso/hooks/cursoList';
import AsignarCurso from '@/components/curso/asignarCurso';
import AsignarProfesor from '@/components/curso/asignarProfesor';
import AsignarMateria from '@/components/curso/asisgnarMateria'; 
import { BlurView } from 'expo-blur';

interface Section {
  id: number;
  name: string;
}

const Curso: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>({ id: 1, name: 'agregar' });

  const handleButtonClick = (section: Section) => {
    setActiveSection(section);
  };

  return (
    <ImageBackground source={require('@/assets/images/epet20.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <BlurView intensity={65} style={styles.blurContainer}>
            <Text style={styles.title}>Gestionar Cursos</Text>

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
            </View>

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
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Curso;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontFamily: 'arial',
  },
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
  ubicacion: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  elegir: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
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
  component: {
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    paddingHorizontal: 20,
  },
});
