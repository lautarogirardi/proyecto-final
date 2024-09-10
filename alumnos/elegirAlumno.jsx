import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Elegir(){
    return(
        
        <View style={styles.container} >

    <label  >Elegir Alumnos: </label>
    <select id= "elegir" >
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
    width: '15%',
  },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    labelText: {
      color: 'white',
    }
  });

