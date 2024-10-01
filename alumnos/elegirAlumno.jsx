import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Elegir(){
    return(
        
        <View style={styles.container} >

    <label style={styles.label} >Elegir Alumnos: </label>
    <select id= "elegir" style={styles.select}>
        <option  value="alumno1">Alumno 1</option>
        <option value="alumno2">Alumno 2</option>
        <option value="alumno3">Alumno 3</option>
    </select>
  
    </View>
    

    );
}
export default Elegir

const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'Right',
    justifyContent: 'Right',
    width: '70%',
    backgroundColor:'transparent' ,
  },

    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },

    select: {
      width: '100%', 
      maxWidth: '300px', 
      padding: 5,
      borderRadius: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      borderWidth: 1,
      borderColor: 'lightblue',
      fontFamily: 'arial',
      fontWeight:'bold',
    },
    label:{
      fontFamily: 'arial',
      fontWeight:'bold',
    }
  });

