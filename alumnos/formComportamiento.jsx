import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Comportamiento(){
    return(
        
        <View style={styles.container}>

        <label for="sanciones">Sanciones:</label>
        <input type="number" id="sanciones" name="sanciones"></input><br/>
        <label for="razon">Razon:</label>
        <textarea name="razon" cols="50" rows="10" id="razon"></textarea><br/>
        <label  for="reportes">Reportes del profesor:</label>
        <input type="text" id="reportes" name="reportes"></input><br/>
        
        
   
    </View>
    

    );
}
export default Comportamiento

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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

  });

