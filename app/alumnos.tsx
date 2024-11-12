import React, { useState } from 'react';
import { Text, View} from '@/components/Themed';
import { ScrollView } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';
import {BlurView} from 'expo-blur';
import BuscarAlumno from '@/alumnos/hooks/pantallausuario';



function InformeEstudiante() {


return (
  
  <ImageBackground source={require('@/fondo/epet23.jpg')} style={styles.backgroundImage}>
    <ScrollView>  
    <View  style={styles.container}>
    

    <BlurView intensity={65} style={styles.blurContainer}>
    <h1 style={styles.title} >Informe de Alumno: </h1>
    <View style={styles.component} ><BuscarAlumno></BuscarAlumno></View>
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