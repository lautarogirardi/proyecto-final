import React from 'react';
import useFirestoreCollection from '@/src/useFirestoreCollection';
import { StyleSheet } from 'react-native';

// Componente funcional para listar los profesores
const ProfesoresList = () => {
  const profesores = useFirestoreCollection('profesores');

  return (
    <div>
      <h1 style={styles.label}>Lista de Profesores</h1>
      <ul>
        {profesores.map(profesor => (
          <li key={profesor.id} style={styles.label}>
            {profesor.Nombre} - DNI: {profesor.dni}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfesoresList;

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Contenedor principal */
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      padding: 20,
  },
  /* Estilo para los campos de entrada de texto */
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
  /* Estilo para las etiquetas */
  label: {
      fontFamily: 'arial',
      marginVertical: 5,
      color: '#000',
      fontWeight: '',
  }
});
