import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

function BuscarAlumno() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [datosAlumno, setDatosAlumno] = useState(null);
    const [datosCurso, setDatosCurso] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const alumnosSnapshot = await getDocs(collection(db, 'alumnos'));
                const alumnosList = alumnosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAlumnos(alumnosList);
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        };
        fetchAlumnos();
    }, []);

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            setModalMessage("Por favor, ingrese un DNI para buscar");
            setModalVisible(true);
            return;
        }

        try {
            const alumnoQuery = query(collection(db, 'alumnos'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(alumnoQuery);

            if (querySnapshot.empty) {
                setModalMessage("No se encontró ningún alumno con ese DNI");
                setModalVisible(true);
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
            setModalMessage("Ocurrió un error al buscar el alumno o su curso");
            setModalVisible(true);
        }
    };

    const handleAlumnoChange = (alumnoId) => {
        const selectedAlumno = alumnos.find(alumno => alumno.id === alumnoId);
        setAlumnoSeleccionado(alumnoId);
        setDatosAlumno(selectedAlumno || null);

        if (selectedAlumno) {
            const fetchCurso = async () => {
                try {
                    const cursoQuery = query(
                        collection(db, 'cursos'),
                        where("alumnos", "array-contains", alumnoId)
                    );
                    const cursoSnapshot = await getDocs(cursoQuery);

                    if (!cursoSnapshot.empty) {
                        const cursoEncontrado = cursoSnapshot.docs[0].data();
                        setDatosCurso(cursoEncontrado);
                    } else {
                        setDatosCurso(null);
                    }
                } catch (error) {
                    console.error("Error al buscar el curso del alumno: ", error);
                }
            };
            fetchCurso();
        } else {
            setDatosCurso(null);
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
            <Text style={styles.label}>O Seleccionar Alumno:</Text>
            <Picker
                selectedValue={alumnoSeleccionado}
                onValueChange={handleAlumnoChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Alumno" value="" />
                {alumnos.map(alumno => (
                    <Picker.Item key={alumno.id} label={alumno.Nombre} value={alumno.id} />
                ))}
            </Picker>

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
                        {Array.isArray(datosAlumno.Reportes) && datosAlumno.Reportes.map((reporte, index) => (
                            <Text key={index} style={styles.subLabel}>
                                -Reporte: {reporte.Reporte}
                            </Text>
                        ))}
                    </View>
                </View>
            ) : (
                <Text style={styles.label}>Ingrese un DNI para buscar al alumno o seleccione un alumno de la lista</Text>
            )}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
