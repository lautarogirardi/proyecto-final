import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

function BuscarAlumno() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [datosAlumno, setDatosAlumno] = useState(null);
    const [datosCurso, setDatosCurso] = useState(null);

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const alumnoQuery = query(collection(db, 'alumnos'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(alumnoQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún alumno con ese DNI");
                window.alert("No se encontró ningún alumno con ese DNI");
                setDatosAlumno(null); 
                setDatosCurso(null); 
            } else {
                const alumnoEncontrado = querySnapshot.docs[0];
                const alumnoData = alumnoEncontrado.data();
                setDatosAlumno(alumnoData);

                const cursoQuery = query(
                    collection(db, 'cursos'),
                    where("alumnos", "array-contains", alumnoEncontrado.id)
                );
                const cursoSnapshot = await getDocs(cursoQuery);

                if (!cursoSnapshot.empty) {
                    const cursoEncontrado = cursoSnapshot.docs[0].data();
                    setDatosCurso(cursoEncontrado);
                } else {
                    setDatosCurso(null); 
                }
            }
        } catch (error) {
            console.error("Error al buscar el alumno: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el alumno o su curso");
            window.alert("Ocurrió un error al buscar el alumno o su curso");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <Button title="Buscar" onPress={buscarPorDni} />

            {datosAlumno ? (
                <View style={styles.datosContainer}>

                    <View style={styles.topLeft}>
                        <Text style={styles.sectionTitle}>Datos Personales:</Text>
                        <Text style={styles.label}>Nombre: {datosAlumno.Nombre}</Text>
                        <Text style={styles.label}>DNI: {datosAlumno.dni}</Text>
                        <Text style={styles.label}>Teléfono: {datosAlumno.Telefono}</Text>
                        <Text style={styles.label}>Email: {datosAlumno.Email}</Text>
                        <Text style={styles.label}>Dirección: {datosAlumno.Direccion}</Text>
                    </View>


                    <View style={styles.topRight}>
                        <Text style={styles.sectionTitle}>Notas:</Text>
                        <Text style={styles.label}>Materias:</Text>
                        {datosAlumno.materias?.map((materia, index) => (
                            <Text key={index} style={styles.subLabel}>
                                - {materia.materia}: {materia.nota}
                            </Text>
                        ))}
                        <Text style={styles.label}>Materias Previas:</Text>
                        {datosAlumno.materiasPrevias?.map((materiaPrevia, index) => (
                            <Text key={index} style={styles.subLabel}>
                                - {materiaPrevia.materiaPrevia}: {materiaPrevia.notaMateriaPrevia}
                            </Text>
                        ))}
                    </View>


                    <View style={styles.bottomLeft}>
                        <Text style={styles.sectionTitle}>Curso:</Text>
                        {datosCurso ? (
                            <>
                                <Text style={styles.label}>Nombre del Curso: {datosCurso.NombreCurso}</Text>
                                <Text style={styles.label}>Horario: {datosCurso.Horario}</Text>
                                <Text style={styles.label}>Turno: {datosCurso.Turno}</Text>
                            </>
                        ) : (
                            <Text style={styles.label}>No se encontró información del curso</Text>
                        )}
                        <Text style={styles.label}>Faltas: {datosAlumno.Faltas}</Text>
                    </View>


                    <View style={styles.bottomRight}>
                        <Text style={styles.sectionTitle}>Comportamiento:</Text>
                        <Text style={styles.label}>Sanciones: {datosAlumno.Sanciones}</Text>
                        {datosAlumno.Reportes?.map((reporte, index) => (
                            <Text key={index} style={styles.subLabel}>
                                -Reporte: {reporte.Reporte}
                            </Text>
                        ))}
                    </View>
                </View>
            ) : (
                <Text style={styles.label}>Ingrese un DNI para buscar al alumno</Text>
            )}
        </View>
    );
}

export default BuscarAlumno;

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
    bottomRight: {
        width: '48%',
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
});