import React from 'react';
import useFirestoreCollection from '../hooks/useFirestoreCollection';

const EstudiantesList = () => {
  const estudiantes = useFirestoreCollection('alumno');

  return (
    <div>
      <h1>Lista de Estudiantes</h1>
      <ul>
        {estudiantes.map(alumno => (
          <li key={alumno.id}>
            {alumno.Nombre} {alumno.Apellido} - DNI: {alumno.dni}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstudiantesList;