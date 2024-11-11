import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

const AsignarMateria = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const cursos = useFirestoreCollection('cursos');
  const materias = useFirestoreCollection('materias');

  const handleAddMateriaToCurso = async () => {
    if (!selectedCurso || !selectedMateria) {
      Alert.alert("Error", "Seleccione un curso y una materia");
      return;
    }

    try {
      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        materias: arrayUnion(selectedMateria)
      });
      setModalVisible(true);
      setSelectedCurso('');
      setSelectedMateria('');
    } catch (error) {
      console.error("Error al agregar la materia al curso: ", error);
      Alert.alert("Error", "No se pudo agregar la materia al curso");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Materias a Cursos</Text>
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
        <Text style={styles.label}>Seleccionar Materia:</Text>
        <Picker
          selectedValue={selectedMateria}
          onValueChange={(itemValue) => setSelectedMateria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una Materia" value="" />
          {materias.map((materia) => (
            <Picker.Item key={materia.id} label={materia.materia} value={materia.id} />
          ))}
        </Picker>
      </View>

      <Button title="Agregar Materia al Curso" onPress={handleAddMateriaToCurso} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Materia agregada al curso correctamente!</Text>
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

export default AsignarMateria;

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
