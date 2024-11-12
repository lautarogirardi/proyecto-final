import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function BuscarCurso() {
    const [nombreCursoBusqueda, setNombreCursoBusqueda] = useState('');
    const [datosCurso, setDatosCurso] = useState(null);
    const [nombresAlumnos, setNombresAlumnos] = useState([]);
    const [profesoresMateria, setProfesoresMateria] = useState([]);

    const buscarPorCurso = async () => {
        if (!nombreCursoBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un nombre de curso para buscar");
            window.alert("Error: Por favor, ingrese un nombre de curso para buscar");
            return;
        }

        try {
            const cursoQuery = query(collection(db, 'cursos'), where("NombreCurso", "==", nombreCursoBusqueda));
            const querySnapshot = await getDocs(cursoQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún curso con ese nombre");
                window.alert("No se encontró ningún curso con ese nombre");
                setDatosCurso(null); 
                setNombresAlumnos([]); 
                setProfesoresMateria([]); 
            } else {
                const cursoEncontrado = querySnapshot.docs[0].data();
                setDatosCurso(cursoEncontrado);

                const alumnosIds = cursoEncontrado.alumnos || [];
                const alumnosNombres = [];

                for (const alumnoId of alumnosIds) {
                    const alumnoSnapshot = await getDocs(collection(db, 'alumnos'));
                    alumnoSnapshot.forEach(doc => {
                        if (doc.id === alumnoId) {
                            const alumno = doc.data();
                            alumnosNombres.push(alumno.Nombre);
                        }
                    });
                }

                setNombresAlumnos(alumnosNombres);

                const profesoresMateriaInfo = [];

                for (const profesor of cursoEncontrado.profesores || []) {
                    const profesorDoc = await getDocs(collection(db, 'profesores'));
                    const materiaDoc = await getDocs(collection(db, 'materias'));

                    profesorDoc.forEach(doc => {
                        if (doc.id === profesor.profesorId) {
                            const profesorData = doc.data();
                            materiaDoc.forEach(materia => {
                                if (materia.id === profesor.materiaId) {
                                    const materiaData = materia.data();
                                    profesoresMateriaInfo.push({
                                        profesor: profesorData.Nombre,
                                        materia: materiaData.materia
                                    });
                                }
                            });
                        }
                    });
                }

                setProfesoresMateria(profesoresMateriaInfo);
            }
        } catch (error) {
            console.error("Error al buscar el curso: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el curso, alumnos, profesores o materias");
            window.alert("Error: Ocurrió un error al buscar el curso, alumnos, profesores o materias");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por Nombre del Curso"
                value={nombreCursoBusqueda}
                onChangeText={setNombreCursoBusqueda}
                style={styles.input}
            />
            <Button title="Buscar" onPress={buscarPorCurso} />

            {datosCurso ? (
                <View style={styles.datosContainer}>
                    <View style={styles.topLeft}>
                        <Text style={styles.sectionTitle}>Curso:</Text>
                        <Text style={styles.label}>Nombre del Curso: {datosCurso.NombreCurso}</Text>
                        <Text style={styles.label}>Horario: {datosCurso.Horario}</Text>
                        <Text style={styles.label}>Turno: {datosCurso.Turno}</Text>
                    </View>

                    <View style={styles.topRight}>
                        <Text style={styles.sectionTitle}>Alumnos:</Text>
                        {nombresAlumnos.length > 0 ? (
                            nombresAlumnos.map((nombre, index) => (
                                <Text key={index} style={styles.subLabel}>
                                    - {nombre}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.subLabel}>No se encontraron alumnos para este curso</Text>
                        )}
                    </View>

                    <View style={styles.bottomLeft}>
                        <Text style={styles.sectionTitle}>Profesores y Materias:</Text>
                        {profesoresMateria.length > 0 ? (
                            profesoresMateria.map((info, index) => (
                                <Text key={index} style={styles.subLabel}>
                                    - {info.profesor}: {info.materia}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.subLabel}>No se encontraron profesores o materias para este curso</Text>
                        )}
                    </View>
                </View>
            ) : (
                <Text style={styles.label}>Ingrese un nombre de curso para buscar</Text>
            )}
        </View>
    );
}

export default BuscarCurso;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        height: 40,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#000',
    },
    subLabel: {
        marginLeft: 10,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E86C1',
        marginBottom: 10,
    },
    datosContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    topLeft: {
        width: '48%',
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    topRight: {
        width: '48%',
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    bottomLeft: {
        width: '48%',
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
});
