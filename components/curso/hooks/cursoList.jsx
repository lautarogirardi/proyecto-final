import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useFirestoreCollection from '../../../src/useFirestoreCollection';
import Button from '@/components/curso/boton';

const CursosList = () => {
  const [turno, setTurno] = useState('');
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cursos = useFirestoreCollection('cursos');
  const alumnos = useFirestoreCollection('alumnos');  // Asegurarse de tener los datos de alumnos

  const filteredCursos = turno ? cursos.filter(curso => curso.Turno === turno) : cursos;

  const handleCursoPress = (curso) => {
    setSelectedCurso(curso);
    setModalVisible(true);
  };

  const getAlumnosNombres = (alumnosIds) => {
    const alumnosNombres = alumnosIds.map(alumnoId => {
      const alumno = alumnos.find(a => a.id === alumnoId);
      return alumno ? `${alumno.Nombre || 'Desconocido'} ${alumno.Apellido || ''} - DNI: ${alumno.dni || 'N/A'}` : 'Desconocido';
    });
    return alumnosNombres.join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cursos</Text>

      <Text style={styles.label}>Filtrar por Turno:</Text>
      <Picker
        selectedValue={turno}
        onValueChange={(value) => setTurno(value)}
        style={styles.input}
      >
        <Picker.Item label="Todos" value="" />
        <Picker.Item label="Mañana" value="Mañana" />
        <Picker.Item label="Tarde" value="Tarde" />
        <Picker.Item label="Vespertino" value="Vespertino" />
      </Picker>

      <FlatList
        data={filteredCursos}
        keyExtractor={(curso) => curso.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCursoPress(item)}>
            <Text style={styles.label}>
              {item.NombreCurso || 'Curso sin nombre'}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {selectedCurso && (
              <>
                <Text style={styles.modalTitle}>Detalles del Curso</Text>
                <Text style={styles.modalText}>Nombre del Curso: {selectedCurso.NombreCurso || 'N/A'}</Text>
                <Text style={styles.modalText}>Turno: {selectedCurso.Turno || 'N/A'}</Text>
                <Text style={styles.modalText}>Profesores: {selectedCurso.Profesores || 'N/A'}</Text>
                <Text style={styles.modalText}>Materias: {selectedCurso.Materias || 'N/A'}</Text>
                <Text style={styles.modalText}>Alumnos: {getAlumnosNombres(selectedCurso.alumnos || [])}</Text>
                <Button title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CursosList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
