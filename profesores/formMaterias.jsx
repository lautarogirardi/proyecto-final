import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Materias(){
    return(
    <View styles={styles.container}>
      
      <label  for="nombre" styles={styles.label}>Nombre:</label>
      <input type="text" id="nombre" name="nombre" style={styles.input}></input>
      <label  for="dni" styles={styles.label}>DNI:</label>
      <input type="text" id="dni" name="dni" style={styles.input}></input><br/>
      <label  for="telefono" styles={styles.label}>Telefono:</label>
      <input type="text" id="telefono" name="telefono" style={styles.input}></input><br/>
      <label  for="faltas" styles={styles.label}>Faltas:</label>
      <input type="number" id="faltas" name="faltas" style={styles.input}></input>
      <h3  styles={styles.label}>Materias Asignadas</h3>
      <label  for="materia1" styles={styles.label}>Materia 1:</label>
      <input type="text" id="materia1" name="materia1" style={styles.input}></input>
      <label  for="curso1" styles={styles.label}>Curso 1:</label>
      <input type="text" id="curso1" name="curso1" style={styles.input}></input> 
     
    </View>


    );
}
export default Materias

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

