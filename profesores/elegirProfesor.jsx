import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function ElegirP(){
    return(
        
        <View style={styles.container} >

    <label  >Elegir Profesor: </label>
    <select id= "elegirP" >
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

