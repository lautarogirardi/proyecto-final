import React, { useState } from 'react';
import { View, Text, Button, Picker, Alert, StyleSheet, ScrollView } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

const Curso: React.FC = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const cursos = ['1°', '2°', '3°', '4°', '5°', '6°'];
  const alumnos = useFirestoreCollection('alumnos'); // Hook personalizado para obtener los alumnos

  const handleAddAlumnoToCurso = async () => {
    if (!selectedCurso || !selectedAlumno) {
      Alert.alert("Error", "Seleccione un curso y un alumno");
      return;
    }

    try {
      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        alumnos: arrayUnion(selectedAlumno)
      });
      Alert.alert("Éxito", "Alumno agregado al curso correctamente");
    } catch (error) {
      console.error("Error al agregar el alumno al curso: ", error);
      Alert.alert("Error", "No se pudo agregar el alumno al curso");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Asignar Alumnos a Cursos</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Seleccionar Curso:</Text>
        <Picker
          selectedValue={selectedCurso}
          onValueChange={(itemValue) => setSelectedCurso(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Curso" value="" />
          {cursos.map((curso, index) => (
            <Picker.Item key={index} label={curso} value={curso} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Seleccionar Alumno:</Text>
        <Picker
          selectedValue={selectedAlumno}
          onValueChange={(itemValue) => setSelectedAlumno(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Alumno" value="" />
          {alumnos.map((alumno) => (
            <Picker.Item key={alumno.id} label={`${alumno.Nombre} ${alumno.Apellido}`} value={alumno.id} />
          ))}
        </Picker>
      </View>

      <Button title="Agregar Alumno al Curso" onPress={handleAddAlumnoToCurso} />
    </ScrollView>
  );
};

export default Curso;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
