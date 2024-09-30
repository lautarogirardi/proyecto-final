import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Informe(){
    return(
        
        <View style={styles.container}>

        <label for="sanciones" style={styles.label}>Puntuacion:</label>
        <input type="text" id="sanciones" name="sanciones" style={styles.input}></input><br/>
        <label for="razon" style={styles.label}>Reportes:</label>
        <textarea name="razon" cols="50" rows="10" id="razon" style={styles.container}></textarea><br/>

        
        
   
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
    input:{
        borderRadius:30,
    },
    label:{
        fontFamily: 'arial',
    }
    
});

