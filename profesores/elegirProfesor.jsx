import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function ElegirP(){
    return(
        
        <View style={styles.container} >

    <label style={styles.label} >Elegir Profesor: </label>
    <select id= "elegirP" style={styles.select}>
        <option  value="profesor1">Profesor 1</option>
        <option value="profesor2">Profesor 2</option>
        <option value="profesor3">Profesor 3</option>
    </select>
  
    </View>
    

    );
}
export default ElegirP

const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'Right',
    justifyContent: 'Right',
    width: '70%',
    backgroundColor:'transparent' ,
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
    },
    select: {
      width: '100%', 
      maxWidth: '300px', 
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.0)', 
      borderWidth: 1,
      borderColor: '#ccc',
      fontFamily: 'arial',
      fontWeight:'bold',
    },
    label:{
      fontFamily: 'arial',
      fontWeight:'bold',
    }
  });

