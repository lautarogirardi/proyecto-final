import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

// Componente funcional para asignar preceptores a cursos
const AsignarPreceptor = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedPreceptor, setSelectedPreceptor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const cursos = useFirestoreCollection('cursos');
  const preceptores = useFirestoreCollection('preceptores'); // Asumiendo que tienes una colección de preceptores

  // Manejar la asignación del preceptor al curso
  const handleAddPreceptorToCurso = async () => {
    if (!selectedCurso || !selectedPreceptor) {
      showAlertModal("Seleccione un curso y un preceptor");
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
      showAlertModal("No se pudo agregar el preceptor al curso");
    }
  };

  // Función para mostrar un mensaje en un modal
  const showAlertModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
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

      {/* Modal para confirmar la asignación del preceptor al curso */}
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

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Contenedor principal */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  /* Estilo para el título */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  /* Estilo para las etiquetas */
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  /* Contenedor para los selectores */
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  /* Estilo para los selectores */
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  /* Estilos para los modales */
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
  /* Estilo del texto en el modal */
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
