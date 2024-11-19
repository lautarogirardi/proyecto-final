import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { updateDoc, doc, arrayUnion, getDoc, collection, getDocs } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

// Componente funcional para asignar profesores a cursos
const AsignarProfesor = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedProfesor, setSelectedProfesor] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [cursoMaterias, setCursoMaterias] = useState([]);
  const [materias, setMaterias] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cursos = useFirestoreCollection('cursos');
  const profesores = useFirestoreCollection('profesores');

  useEffect(() => {
    const fetchCursoMaterias = async () => {
      if (selectedCurso) {
        const cursoRef = doc(db, 'cursos', selectedCurso);
        const cursoDoc = await getDoc(cursoRef);
        if (cursoDoc.exists()) {
          const materiasData = cursoDoc.data().materias || [];
          setCursoMaterias(materiasData);

          // Obtener nombres de materias
          const materiasCollection = await getDocs(collection(db, 'materias'));
          const materiasMap = {};
          materiasCollection.forEach((doc) => {
            materiasMap[doc.id] = doc.data().materia;
          });
          setMaterias(materiasMap);
        }
      } else {
        setCursoMaterias([]);
        setMaterias({});
      }
    };

    fetchCursoMaterias();
  }, [selectedCurso]);

  // Manejar la asignación del profesor al curso
  const handleAddProfesorToCurso = async () => {
    if (!selectedCurso || !selectedProfesor || !selectedMateria) {
      showAlertModal("Seleccione un curso, un profesor y una materia");
      return;
    }

    try {
      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        profesores: arrayUnion({
          profesorId: selectedProfesor,
          materiaId: selectedMateria,
          materiaNombre: materias[selectedMateria] // Añadir el nombre de la materia
        })
      });
      setModalVisible(true);
      setSelectedCurso('');
      setSelectedProfesor('');
      setSelectedMateria('');
    } catch (error) {
      console.error("Error al agregar el profesor al curso: ", error);
      showAlertModal("No se pudo agregar el profesor al curso");
    }
  };

  // Función para mostrar un mensaje en un modal
  const showAlertModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
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

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Seleccionar Materia:</Text>
        <Picker
          selectedValue={selectedMateria}
          onValueChange={(itemValue) => setSelectedMateria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una Materia" value="" />
          {cursoMaterias.map((materiaId) => (
            <Picker.Item key={materiaId} label={materias[materiaId]} value={materiaId} />
          ))}
        </Picker>
      </View>

      <Button title="Agregar Profesor al Curso" onPress={handleAddProfesorToCurso} />

      {/* Modal para confirmar la asignación del profesor al curso */}
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

export default AsignarProfesor;

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
