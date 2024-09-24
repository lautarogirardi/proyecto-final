import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

interface InformeProps {}

const Informe: React.FC<InformeProps> = () => {
  return (
    <View style={styles.container}>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" />
      <label htmlFor="curso">Curso:</label>
      <input type="text" id="curso" name="curso" />
      <label htmlFor="dni">DNI:</label>
      <input type="text" id="dni" name="dni" /><br />
      <label htmlFor="faltas">Faltas:</label>
      <input type="number" id="faltas" name="faltas" />
      <h3>Materias y Notas</h3>
      <label htmlFor="materia1">Materia 1:</label>
      <input type="text" id="materia1" name="materia1" />
      <label htmlFor="nota1">Nota 1:</label>
      <input type="number" id="nota1" name="nota1" />
      <label htmlFor="materiaPrevia1">Materia Previa 1:</label>
      <input type="text" id="materiaPrevia1" name="materiaPrevia1" />
    </View>
  );
};

export default Informe;

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
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  labelText: {
    color: 'white',
  },
});
