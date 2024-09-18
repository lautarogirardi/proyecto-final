import { StyleSheet } from 'react-native';

import React from 'react';
import { Text, View } from '@/components/Themed';


function Materias(){
    return(
    <View styles={styles.container}>

      <label  for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre"></input>
      <label  for="dni">DNI:</label>
      <input type="text" id="dni" name="dni"></input><br/>
      <label  for="telefono">Telefono:</label>
      <input type="text" id="telefono" name="telefono"></input><br/>
      <label  for="faltas">Faltas:</label>
      <input type="number" id="faltas" name="faltas"></input>
      <h3  >Materias Asignadas</h3>
      <label  for="materia1">Materia 1:</label>
      <input type="text" id="materia1" name="materia1"></input>
      <label  for="curso1">Curso 1:</label>
      <input type="text" id="curso1" name="curso1"></input> 

    </View>


    );
}
export default Materias

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
    },
    input:{
        width: 100,   
      
        padding: 10,
        border: 1,
        border:solid,
        borderradius: 3,
      }
});

