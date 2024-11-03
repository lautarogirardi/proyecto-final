import { db } from '../../firebase';

// Agregar un nuevo estudiante
export const addAlumno = (alumno) => {
  return db.collection('alumno').add(alumno);
};

// Actualizar la información de un estudiante
export const updateAlumno = (id, updatedInfo) => {
  return db.collection('alumno').doc(id).update(updatedInfo);
};

// Eliminar a un estudiante
export const deleteAlumno = (id) => {
  return db.collection('alumno').doc(id).delete();
};

// Obtener un estudiante por su ID
export const getAlumno = (id) => {
  return db.collection('alumno').doc(id).get();
};

// Obtener todos los estudiantes
export const getAlumnos = async () => {
  const snapshot = await db.collection('alumno').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
