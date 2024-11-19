import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Alert, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore';

function EliminarCurso() {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [preceptores, setPreceptores] = useState([]);
  const [formData, setFormData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cursosData, profesoresData, alumnosData, preceptoresData] = await Promise.all([
          getDocs(collection(db, 'cursos')),
          getDocs(collection(db, 'profesores')),
          getDocs(collection(db, 'alumnos')),
          getDocs(collection(db, 'preceptores')),
        ]);

        const cursosList = cursosData.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).filter(curso => curso.habilitado !== false); // Excluir cursos deshabilitados
        setCursos(cursosList);

        const profesoresList = profesoresData.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfesores(profesoresList);

        const alumnosList = alumnosData.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlumnos(alumnosList);

        const preceptoresList = preceptoresData.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPreceptores(preceptoresList);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };
    fetchData();
  }, []);

  const handleCursoChange = (cursoId) => {
    setSelectedCurso(cursoId);
    const selectedCursoData = cursos.find(curso => curso.id === cursoId);
    setFormData(selectedCursoData || null);
  };

  const eliminarCurso = useCallback(async () => {
    if (!selectedCurso) {
      Alert.alert("Error", "Seleccione un curso");
      return;
    }

    try {
      await deleteDoc(doc(db, 'cursos', selectedCurso));
      Alert.alert("Curso eliminado", "El curso ha sido eliminado correctamente");
      setSelectedCurso('');
      setFormData(null);

      // Actualizar lista de cursos excluyendo el curso eliminado
      setCursos(prevCursos => prevCursos.filter(curso => curso.id !== selectedCurso));
    } catch (error) {
      console.error("Error al eliminar el curso: ", error);
      Alert.alert("Error", "No se pudo eliminar el curso");
    }
  }, [selectedCurso]);

  const confirmarEliminarCurso = () => {
    setModalVisible(true);
  };

  const getNombre = (id, collection) => {
    const item = collection.find(a => a.id === id);
    return item ? `${item.Nombre} ${item.Apellido || ''}` : 'Desconocido';
  };

  const removerElemento = async (tipo, elemento) => {
    if (!selectedCurso) {
      Alert.alert("Error", "Seleccione un curso");
      return;
    }

    try {
      const cursoRef = doc(db, 'cursos', selectedCurso);
      await updateDoc(cursoRef, {
        [tipo]: arrayRemove(elemento)
      });
      Alert.alert("Elemento removido", `${tipo.slice(0, -1)} ha sido removido correctamente del curso`);

      setFormData({
        ...formData,
        [tipo]: formData[tipo].filter(e => e !== elemento)
      });
    } catch (error) {
      console.error(`Error al remover ${tipo.slice(0, -1)} del curso: `, error);
      Alert.alert("Error", `No se pudo remover ${tipo.slice(0, -1)} del curso`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seleccionar Curso:</Text>
      <Picker
        selectedValue={selectedCurso}
        onValueChange={handleCursoChange}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un Curso" value="" />
        {cursos.map(curso => (
          <Picker.Item key={curso.id} label={curso.NombreCurso} value={curso.id} />
        ))}
      </Picker>
      {formData && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Nombre del Curso: {formData.NombreCurso}</Text>
          <Text style={styles.label}>Turno: {formData.Turno}</Text>
          <Text style={styles.label}>Horario: {formData.Horario}</Text>
          <Text style={styles.label}>Profesores:</Text>
          {formData.profesores && formData.profesores.map((profesor) => (
            <View key={profesor.profesorId} style={styles.elementContainer}>
              <Text>{profesor.materiaNombre}: {getNombre(profesor.profesorId, profesores)}</Text>
              <Button title="Sacar" onPress={() => removerElemento('profesores', profesor)} color="orange" />
            </View>
          ))}
          <Text style={styles.label}>Alumnos:</Text>
          {formData.alumnos && formData.alumnos.map((alumnoId) => (
            <View key={alumnoId} style={styles.elementContainer}>
              <Text>{getNombre(alumnoId, alumnos)}</Text>
              <Button title="Sacar" onPress={() => removerElemento('alumnos', alumnoId)} color="orange" />
            </View>
          ))}
          <Text style={styles.label}>Preceptores:</Text>
          {formData.preceptores && formData.preceptores.map((preceptorId) => (
            <View key={preceptorId} style={styles.elementContainer}>
              <Text>{getNombre(preceptorId, preceptores)}</Text>
              <Button title="Sacar" onPress={() => removerElemento('preceptores', preceptorId)} color="orange" />
            </View>
          ))}
          <View style={styles.br} />
          <Button title="Eliminar Curso" onPress={confirmarEliminarCurso} color="red" />
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Estás seguro de eliminar el curso?</Text>
            <Text style={styles.modalText}>¡Se perderá toda la información!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  setModalVisible(false);
                  eliminarCurso();
                }}
              >
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EliminarCurso;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    padding: 20,
  },
  input: {
    padding: 5,
    width: '100%',
    borderRadius: 15,
    height: 40,
    borderColor: 'lightblue',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginVertical: 5,
    color: '#000',
  },
  label: {
    marginVertical: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  br: {
    height: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  elementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
    },
    buttonCancel: {
      backgroundColor: 'grey',
    },
    buttonDelete: {
      backgroundColor: 'red',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
