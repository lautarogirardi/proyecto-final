import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

const AsignarPreceptor = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedPreceptor, setSelectedPreceptor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const cursos = useFirestoreCollection('cursos');
  const preceptores = useFirestoreCollection('preceptores'); // Asumiendo que tienes una colección de preceptores

  const handleAddPreceptorToCurso = async () => {
    if (!selectedCurso || !selectedPreceptor) {
      Alert.alert("Error", "Seleccione un curso y un preceptor");
      return;
    }

    try {
      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        preceptores: arrayUnion(selectedPreceptor)
      });
      setModalVisible(true);
      setSelectedCurso('');
      setSelectedPreceptor('');
    } catch (error) {
      console.error("Error al agregar el preceptor al curso: ", error);
      Alert.alert("Error", "No se pudo agregar el preceptor al curso");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Preceptores a Cursos</Text>

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
        <Text style={styles.label}>Seleccionar Preceptor:</Text>
        <Picker
          selectedValue={selectedPreceptor}
          onValueChange={(itemValue) => setSelectedPreceptor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Preceptor" value="" />
          {preceptores.map((preceptor) => (
            <Picker.Item key={preceptor.id} label={`${preceptor.Nombre || ''} ${preceptor.Apellido || ''} - DNI: ${preceptor.dni || ''}`} value={preceptor.id} />
          ))}
        </Picker>
      </View>

      <Button title="Agregar Preceptor al Curso" onPress={handleAddPreceptorToCurso} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Preceptor agregado al curso correctamente!</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AsignarPreceptor;

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
