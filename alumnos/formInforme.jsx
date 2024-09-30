import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Informe(){
    return(
    <View styles={styles.container}>

      <label  for="nombre" style={styles.label}>Nombre:</label>
      <input type="text" id="nombre" name="nombre" style={styles.input}></input>
      <label  for="curso" style={styles.label}>Curso:</label>
      <input type="text" id="curso" name="curso" style={styles.input}></input>
      <label  for="dni" style={styles.label}>DNI:</label>
      <input type="text" id="dni" name="dni" style={styles.input}></input><br/>
      <label  for="faltas" style={styles.label}>Faltas:</label>
      <input type="number" id="faltas" name="faltas" style={styles.input}></input>
      <h3  style={styles.title}>Materias y Notas</h3>
      <label  for="materia1" style={styles.label}>Materia 1:</label>
      <input type="text" id="materia1" name="materia1" style={styles.input}></input>
      <label  for="nota1" style={styles.label}>Nota 1:</label>
      <input type="number" id="nota1" name="nota1" style={styles.input}></input> 
      
      <label  for="materiaPrevia1" style={styles.label}>Materia Previa 1:</label>
      <input type="text" id="materiaPrevia1" name="materiaPrevia1" style={styles.input}></input>

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
    fontFamily:'arial',
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

