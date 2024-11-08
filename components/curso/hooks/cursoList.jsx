import React from 'react';
import useFirestoreCollection from '../../../src/useFirestoreCollection';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const CursosList = () => {
  const cursos = useFirestoreCollection('cursos');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cursos</Text>
      <FlatList
        data={cursos}
        keyExtractor={(curso) => curso.id}
        renderItem={({ item }) => (
          <Text style={styles.label}>
            {item.NombreCurso} - Código: {item.CodigoCurso}
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
});
