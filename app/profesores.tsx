import React, { useState } from 'react';
import { Text, View} from '@/components/Themed';
import { ScrollView } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';
import ProfesorAdd from '@/components/profesores/hooks/profesorAdd';
import {BlurView} from 'expo-blur';
import ActualizarP from '@/components/profesores/hooks/actualizarProfesor';
import EliminarP from '@/components/profesores/hooks/eliminarProfesor';
import ProfesoresList from '@/components/profesores/hooks/profesorList';



interface Section {
id: number;
name: string;
}

function InformeEstudiante() {
const [activeSection, setActiveSection] = useState<Section>({ id: 1, name: 'agregar' });

const handleButtonClick = (section: Section) => {
    setActiveSection(section);
};

return (
  
  <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.backgroundImage}>
    <ScrollView>  
    <View  style={styles.container}>
    

    <BlurView intensity={65} style={styles.blurContainer}>
    <h1 style={styles.title} >Modificar Profesor: </h1>
    

    <View style={styles.ubicacion} >
        <button onClick={() => handleButtonClick({ id: 1, name: 'agregar' })} style={styles.boton}>Agregar</button>
        <button onClick={() => handleButtonClick({ id: 2, name: 'actualizar' })} style={styles.boton}>Actualizar</button>
        <button onClick={() => handleButtonClick({ id: 3, name: 'eliminar' })} style={styles.boton}>Eliminar</button>
        <button onClick={() => handleButtonClick({ id: 4, name: 'lista' })} style={styles.boton} >Lista de Estudiantes</button>
    </View>

    {activeSection.name === 'agregar' && (
        <View style={styles.component}>
            <ProfesorAdd></ProfesorAdd>
        </View>
        
    )}

        {activeSection.name === 'actualizar' && (
        
        <View style={styles.component}>
          <ActualizarP></ActualizarP>
          </View>
        
    )}

    
        {activeSection.name === 'eliminar' && (
        
        <View style={styles.component}>
          <EliminarP></EliminarP>
        </View>
        
    )}

        {activeSection.name === 'lista' && (
        
        <View style={styles.component}>
          <ProfesoresList></ProfesoresList>
        </View>
        
    )}

    </BlurView>
    </View>
    
    
    </ScrollView>
    </ImageBackground>
);
}

export default InformeEstudiante;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:"cover",
  },
  title: {
  fontFamily: 'arial',
    fontWeight: 'bold',
    marginBottom: 20,

  },
  text: {
    fontFamily:'arial',
  },
  boton:{
    backgroundColor: 'lightblue', 
    padding: 10,
    color: '#000',
    borderRadius: 40,
    cursor: 'pointer',
    width:200,
    height:40,
    textAlign: 'center',
    fontSize:15,
    fontWeight:'bold',
    fontFamily:'arial',
    borderColor:'lightblue',
    borderWidth: 2,
  }
  ,

  ubicacion:{
    flexDirection: 'row' ,
    justifyContent: 'center',
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
    alignItems:'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderColor:'lightblue',
    borderWidth: 2,
  },
  component:{
    marginBottom: 10, 

    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  },

  });