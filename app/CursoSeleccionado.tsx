import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';

const CursoSeleccionado = () => {
const [cursoSeleccionado, setCursoSeleccionado] = useState<string>('');
const [divisionSeleccionada, setDivisionSeleccionada] = useState<string>('');
const [estudiantes, setEstudiantes] = useState<{ aula: string; nombre: string; apellido: string; email: string }[]>([]);
const [cargando, setCargando] = useState<boolean>(false);

useEffect(() => {
    const obtenerDatos = async (): Promise<void> => {
    if (cursoSeleccionado && divisionSeleccionada) {
        setCargando(true);
        try {
        const snapshot = await firebase.database().ref(`cursos/${cursoSeleccionado}/${divisionSeleccionada}`).once('value');
        const data = snapshot.val();
        if (data && data.estudiantes) {
            setEstudiantes(data.estudiantes);
        } else {
            console.error('No se encontraron estudiantes');
        }
        } catch (error) {
        console.error('Error al obtener datos:', error);
        } finally {
        setIsFetchingData(false);
        }
    }
    };
    obtenerDatos();
}, [cursoSeleccionado, divisionSeleccionada]);

const [isFetchingData, setIsFetchingData] = useState<boolean>(false)

return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del Curso</Text>
      {isFetchingData ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <FlatList
          data={estudiantes}
          renderItem={({ item }: { item: { aula: string; nombre: string; apellido: string; email: string } }) => (
            <View style={styles.row}>
              <Text style={styles.column}>{item.nombre}</Text>
              <Text style={styles.column}>{item.apellido}</Text>
              <Text style={styles.column}>{item.email}</Text>
            </View>
          )}
          keyExtractor={(item) => item.aula}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
},
loading: {
    fontSize: 18,
    color: '#999',
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