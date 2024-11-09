import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Picker } from 'react-native';
import useFirestoreCollection from '../../../src/useFirestoreCollection';

const CursosList = () => {
  const [turno, setTurno] = useState('');
  const cursos = useFirestoreCollection('cursos');

  const filteredCursos = turno ? cursos.filter(curso => curso.Turno === turno) : cursos;

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
          <Text style={styles.label}>
            {item.NombreCurso}
          </Text>
        )}
      />
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
});
