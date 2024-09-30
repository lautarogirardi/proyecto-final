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
        backgroundColor: 'rgba(255, 255, 255, 0.0)', 
        padding: 20,
        fontFamily:'arial',
        fontWeight:'bold',
      },
      input:{
        width: '100%',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
      },
      label:{
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight:'bold', 
      }
});

