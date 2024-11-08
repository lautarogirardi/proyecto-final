import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Picker, Modal } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';
const AsignarCurso = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const cursos = useFirestoreCollection('cursos'); 
  const alumnos = useFirestoreCollection('alumnos'); 
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
      setModalVisible(true);
    } catch (error) {
      console.error("Error al agregar el alumno al curso: ", error);
      Alert.alert("Error", "No se pudo agregar el alumno al curso");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Alumnos a Cursos</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Seleccionar Curso:</Text>
        <Picker
          selectedValue={selectedCurso}
          onValueChange={(itemValue) => setSelectedCurso(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Curso" value="" />
          {cursos.map((curso) => (
            <Picker.Item key={curso.id} label={curso.NombreCurso} value={curso.id} />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Alumno agregado al curso correctamente!</Text>
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AsignarCurso;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
