import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig';
import { updateDoc, doc, arrayUnion, getDoc, collection, getDocs } from 'firebase/firestore';
import useFirestoreCollection from '../../src/useFirestoreCollection';

const AsignarProfesor = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedProfesor, setSelectedProfesor] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [cursoMaterias, setCursoMaterias] = useState([]);
  const [materias, setMaterias] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

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

          // Fetch nombres de materias
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

  const handleAddProfesorToCurso = async () => {
    if (!selectedCurso || !selectedProfesor || !selectedMateria) {
      Alert.alert("Error", "Seleccione un curso, un profesor y una materia");
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
