import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import Curso from '../components/curso/curso'; 
const FormScreen: React.FC = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>('');
  const [divisionSeleccionada, setDivisionSeleccionada] = useState<string>('');

  return (
    <View style={styles.container}>
      <Curso 
        cursoSeleccionado={cursoSeleccionado} 
        setCursoSeleccionado={setCursoSeleccionado}
        divisionSeleccionada={divisionSeleccionada}
        setDivisionSeleccionada={setDivisionSeleccionada}
      />
      <Link href={'/CursoSeleccionado'}>
        <Text style={styles.button}>Buscar</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FormScreen;
