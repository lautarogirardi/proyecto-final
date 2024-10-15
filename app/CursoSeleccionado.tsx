import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

const CursoSeleccionado = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [divisionSeleccionada, setDivisionSeleccionada] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (cursoSeleccionado && divisionSeleccionada) {
        setCargando(true);
        try {
          const snapshot = await get(ref(database, `cursos/${cursoSeleccionado}/${divisionSeleccionada}`));
          const data = snapshot.val();
          if (data && data.estudiantes) {
            setEstudiantes(Object.values(data.estudiantes));
          } else {
            console.error('No se encontraron estudiantes');
          }
        } catch (error) {
          console.error('Error al obtener datos:', error);
        } finally {
          setCargando(false);
        }
      }
    };
    obtenerDatos();
  }, [cursoSeleccionado, divisionSeleccionada]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del Curso</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <FlatList
          data={estudiantes}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.column}>{item.nombre}</Text>
              <Text style={styles.column}>{item.apellido}</Text>
              <Text style={styles.column}>{item.email}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  column: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
});

export default CursoSeleccionado;
