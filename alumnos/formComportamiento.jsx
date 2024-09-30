import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Comportamiento(){
    return(
        
        <View style={styles.container}>

        <label for="sanciones" style={styles.label}>Sanciones:</label>
        <input type="number" id="sanciones" name="sanciones" style={styles.input}></input><br/>
        <label for="razon" style={styles.label}>Razon:</label>
        <textarea name="razon" cols="50" rows="10" id="razon" style={styles.input}></textarea><br/>
        <label  for="reportes" style={styles.label}>Reportes del profesor:</label>
        <input type="text" id="reportes" name="reportes" style={styles.input}></input><br/>
        
        
   
    </View>
    

    );
}
export default Comportamiento

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

