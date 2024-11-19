import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc, arrayUnion, query, where } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

// Componente funcional para asignar alumnos a cursos
const AsignarCurso = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cursos = useFirestoreCollection('cursos'); 
  const alumnos = useFirestoreCollection('alumnos'); 

  // Manejar la asignación del alumno al curso
  const handleAddAlumnoToCurso = async () => {
    if (!selectedCurso || !selectedAlumno) {
      showAlertModal("Seleccione un curso y un alumno");
      return;
    }

    try {
      // Verificar si el alumno ya está en algún curso
      const q = query(collection(db, 'cursos'), where('alumnos', 'array-contains', selectedAlumno));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage("El alumno ya está registrado en otro curso.");
        setErrorModalVisible(true);
        return;
      }

      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        alumnos: arrayUnion(selectedAlumno)
      });
      setModalVisible(true);
      setSelectedCurso('');
      setSelectedAlumno('');
    } catch (error) {
      console.error("Error al agregar el alumno al curso: ", error);
      showAlertModal("No se pudo agregar el alumno al curso");
    }
  };

  // Función para mostrar un mensaje en un modal
  const showAlertModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
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
            <Picker.Item key={alumno.id} label={`${alumno.Nombre || ''} ${alumno.Apellido || ''} - DNI: ${alumno.dni || ''}`} value={alumno.id} />
          ))}
        </Picker>
      </View>

      <Button title="Agregar Alumno al Curso" onPress={handleAddAlumnoToCurso} />

      {/* Modal para confirmar la asignación del alumno al curso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
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

      {/* Modal para mostrar mensajes de error */}
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

export default AsignarCurso;

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
