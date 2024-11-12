import React from 'react';
import useFirestoreCollection from '@/src/hooks/useFirestoreCollection';
import { StyleSheet } from 'react-native';

const AlumnosList = () => {
  const alumnos = useFirestoreCollection('alumnos');

  return (
    <div>
      <h1 style={styles.label}>Lista de Alumnos</h1>
      <ul>
        {alumnos.map(alumno => (
          <li key={alumno.id} style={styles.label}>
            {alumno.Nombre} {alumno.Apellido} - DNI: {alumno.dni}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlumnosList;

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
