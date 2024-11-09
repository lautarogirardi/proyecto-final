import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc, arrayUnion, query, where } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

const AsignarProfesor = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedProfesor, setSelectedProfesor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cursos = useFirestoreCollection('cursos');
  const profesores = useFirestoreCollection('profesores');

  const handleAddProfesorToCurso = async () => {
    if (!selectedCurso || !selectedProfesor) {
      Alert.alert("Error", "Seleccione un curso y un profesor");
      return;
    }

    try {
      // Verificar si el profesor ya está en algún curso
      const q = query(collection(db, 'cursos'), where('profesores', 'array-contains', selectedProfesor));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage("El profesor ya está asignado a otro curso.");
        setErrorModalVisible(true);
        return;
      }

      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        profesores: arrayUnion(selectedProfesor)
      });
      setModalVisible(true);
      setSelectedCurso('');
      setSelectedProfesor('');
    } catch (error) {
      console.error("Error al agregar el profesor al curso: ", error);
      Alert.alert("Error", "No se pudo agregar el profesor al curso");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Profesores a Cursos</Text>
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
        <Text style={styles.label}>Seleccionar Profesor:</Text>
        <Picker
          selectedValue={selectedProfesor}
          onValueChange={(itemValue) => setSelectedProfesor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Profesor" value="" />
          {profesores.map((profesor) => (
            <Picker.Item key={profesor.id} label={`${profesor.Nombre || ''} ${profesor.Apellido || ''} - DNI: ${profesor.dni || ''}`} value={profesor.id} />
          ))}
        </Picker>
      </View>

      <Button title="Agregar Profesor al Curso" onPress={handleAddProfesorToCurso} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Profesor agregado al curso correctamente!</Text>
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(!errorModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Button
              title="Cerrar"
              onPress={() => setErrorModalVisible(!errorModalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AsignarProfesor;

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
