import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Materias(){
    return(
    <View style={styles.container}>
      
      <label  for="nombre" style={styles.label}>Nombre:</label>
      <input type="text" id="nombre" name="nombre" style={styles.input}></input>
      <label  for="curso" style={styles.label}>Curso:</label>
      <input type="text" id="curso" name="curso" style={styles.input}></input>
      <label  for="dni" style={styles.label}>DNI:</label>
      <input type="text" id="dni" name="dni" style={styles.input}></input>
      <label  for="faltas" style={styles.label}>Faltas:</label>
      <input type="text" id="faltas" name="faltas" style={styles.input}></input>
      <h3  style={styles.label}>Materias y Notas</h3>
      <label  for="materia1" style={styles.label}>Materia 1:</label>
      <input type="text" id="materia1" name="materia1" style={styles.input}></input>
      <label  for="nota1" style={styles.label}>Nota 1:</label>
      <input type="number" id="nota1" name="nota1" style={styles.input}></input> 
      
      <label  for="materiaPrevia1" style={styles.label}>Materia Previa 1:</label>
      <input type="text" id="materiaPrevia1" name="materiaPrevia1" style={styles.input}></input>
     
    </View>


    );
}
export default Materias

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.0)', 
      padding: 20,
    },
    input:{
      width: '100%',
      borderRadius: 10,
      borderColor:'lightblue',
      borderWidth: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    label:{
      fontFamily: 'arial',
      marginVertical: 5,
      color: '#000',
      fontWeight:'bold',
    }

});



