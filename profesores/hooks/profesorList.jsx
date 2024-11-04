import React from 'react';
import useFirestoreCollection from '@/src/hooks/useFirestoreCollection';
import { StyleSheet } from 'react-native';
const ProfesoresList = () => {
  const estudiantes = useFirestoreCollection('profesores');

  return (
    <div>
      <h1 style={styles.label}>Lista de Profesores</h1>
      <ul>
        {estudiantes.map(profesor => (
          <li key={profesor.id} style={styles.label}>
            {profesor.Nombre} - DNI: {profesor.dni}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfesoresList;

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
      borderRadius: 10,
      height: 40,
      borderColor: 'lightblue',
      borderWidth: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      fontFamily: 'arial',
      marginVertical: 5,
      color: '#000',

  },
  label: {
      fontFamily: 'arial',
      marginVertical: 5,
      color: '#000',
      fontWeight: '',
  }

});
