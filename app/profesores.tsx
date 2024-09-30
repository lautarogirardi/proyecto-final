import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { ImageBackground, StyleSheet } from 'react-native';
import Materias  from '@/profesores/formMaterias';
import Informe from '@/profesores/formInforme';
import ElegirP from '@/profesores/elegirProfesor';

interface Section {
id: number;
name: string;
}

function InformeEstudiante() {
const [activeSection, setActiveSection] = useState<Section>({ id: 1, name: 'materias' });

const handleButtonClick = (section: Section) => {
    setActiveSection(section);
};

return (
  <ImageBackground source={require('@/fondo/epet20.jpg')} style={styles.backgroundImage}>
    <View style={styles.container} >
    
    <View style={styles.lindo}>
    
    <h1 style={styles.title}>Informe de Profesores: </h1>
    <View style={styles.elegirP} >
    <ElegirP></ElegirP>
    </View>
    
    <View style={styles.ubicacion} >
        <button onClick={() => handleButtonClick({ id: 1, name: 'materias' })} style={styles.boton}>Materias</button>
        <button onClick={() => handleButtonClick({ id: 2, name: 'informe' })} style={styles.boton} >Informe</button>
    </View>

    {activeSection.name === 'materias' && (
        <Materias></Materias> 
        
    )}

    {activeSection.name === 'informe' && (
        
        <Informe></Informe>
        
    )}
    </View>
    </View>
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
    },
    title: {
    fontFamily: 'arial',
      fontWeight: 'bold',
    },
    text: {
      fontFamily:'arial',
    },
    boton:{
      backgroundColor: 'lightblue',

      padding: 10,

      borderRadius: 5,
      cursor: 'pointer',
      width:200,
      height:40,
    }
    ,
    lindo:{
      backgroundColor: '#ffffff', 
      borderRadius: 15, 
      padding: 30, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.9,
      shadowRadius: 12,
      elevation: 5, 
      width: 500, 
    },
    ubicacion:{
      flexDirection: 'row' ,
      justifyContent: 'center',
    },
    elegirP: {
      marginBottom: 10, 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
    },
  });