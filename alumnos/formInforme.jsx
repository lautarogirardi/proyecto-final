import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Informe(){
    return(
    <View styles={styles.container}>

      <label  for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre"></input>
      <label  for="curso">Curso:</label>
      <input type="text" id="curso" name="curso"></input>
      <label  for="dni">DNI:</label>
      <input type="text" id="dni" name="dni"></input><br/>
      <label  for="faltas">Faltas:</label>
      <input type="number" id="faltas" name="faltas"></input>
      <h3  >Materias y Notas</h3>
      <label  for="materia1">Materia 1:</label>
      <input type="text" id="materia1" name="materia1"></input>
      <label  for="nota1">Nota 1:</label>
      <input type="number" id="nota1" name="nota1"></input> 
      
      <label  for="materiaPrevia1">Materia Previa 1:</label>
      <input type="text" id="materiaPrevia1" name="materiaPrevia1"></input>

    </View>


    );
}
export default Informe

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    labelText: {
      color: 'white',
    }
});

