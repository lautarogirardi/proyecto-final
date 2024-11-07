import React from 'react';
import useFirestoreCollection from '../../../src/useFirestoreCollection';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const EstudiantesList = () => {
  const estudiantes = useFirestoreCollection('alumnos');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Estudiantes</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(alumno) => alumno.id}
        renderItem={({ item }) => (
          <Text style={styles.label}>
            {item.Nombre} {item.Apellido} - DNI: {item.dni}
          </Text>
        )}
      />
    </View>
  );
};

export default EstudiantesList;

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
});
