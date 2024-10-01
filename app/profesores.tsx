import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { ImageBackground, StyleSheet } from 'react-native';
import Materias  from '@/profesores/formMaterias';
import Informe from '@/profesores/formInforme';
import ElegirP from '@/profesores/elegirProfesor';
import { BlurView } from 'expo-blur';


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
  <ImageBackground source={require('@/fondo/epet23.jpg')} style={styles.backgroundImage}>
    
    <View style={styles.container} >
    
    
    <BlurView intensity={65} style={styles.blurContainer}>
    <h1 style={styles.title}>Informe de Profesores: </h1>
    <View style={styles.elegirP} >
    <ElegirP></ElegirP>
    </View>
    
    <View style={styles.ubicacion} >
        <button onClick={() => handleButtonClick({ id: 1, name: 'materias' })} style={styles.boton}>Materias</button>
        <button onClick={() => handleButtonClick({ id: 2, name: 'informe' })} style={styles.boton} >Informe</button>
    </View>

    {activeSection.name === 'materias' && (
        <View style={styles.materias}><Materias></Materias></View> 
        
    )}

    {activeSection.name === 'informe' && (
        
        <View style={styles.informe}><Informe></Informe></View> 
        
    )}
    </BlurView>
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
      resizeMode:"cover", 
    },
    title: {
    fontFamily: 'arial',
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000', 
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
    elegirP: {
      marginBottom: 10, 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.0)'
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
    informe:{
      marginBottom: 10, 

      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.0)'
    },
    materias:{
      marginBottom: 10, 

      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.0)'
    }
  });