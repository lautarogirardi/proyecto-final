import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Informe(){
    return(
        
        <View style={styles.container}>

        <label for="sanciones">Puntuacion:</label>
        <input type="text" id="sanciones" name="sanciones"></input><br/>
        <label for="razon">Reportes:</label>
        <textarea name="razon" cols="50" rows="10" id="razon"></textarea><br/>

        
        
   
    </View>
    

    );
}
export default Informe

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

