import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';

const Curso = ({ cursoSeleccionado, setCursoSeleccionado, divisionSeleccionada, setDivisionSeleccionada }) => {
  // Opciones de cursos y divisiones
  const cursos = ['1°', '2°', '3°', '4°', '5°', '6°'];
  const divisiones = ['1°', '2°', '3°', '4°', '5°'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Cursos</Text>

      {/* Picker para seleccionar curso */}
      <Picker
        selectedValue={cursoSeleccionado}
        style={styles.input}
        onValueChange={(itemValue) => setCursoSeleccionado(itemValue)}
      >
        <Picker.Item label="Selecciona un Curso" value="" />
        {cursos.map((curso, index) => (
          <Picker.Item key={index} label={curso} value={curso} />
        ))}
      </Picker>

      {/* Picker para seleccionar división */}
      <Picker
        selectedValue={divisionSeleccionada}
        style={styles.input}
        onValueChange={(itemValue) => setDivisionSeleccionada(itemValue)}
      >
        <Picker.Item label="Selecciona la división" value="" />
        {divisiones.map((division, index) => (
          <Picker.Item key={index} label={division} value={division} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});

export default Curso;
