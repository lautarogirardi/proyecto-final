import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

// Componente funcional para enlistar y actualizar información de un estudiante
function Enlistar() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Reportes: ''
    });
    const [materias, setMaterias] = useState([{ materia: '', nota: '' }]);
    const [materiasPrevias, setMateriasPrevias] = useState([{ materiaPrevia: '', notaMateriaPrevia: '' }]);
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);

    // Función para buscar un estudiante por DNI
    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const estudianteQuery = query(collection(db, 'alumnos'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(estudianteQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún estudiante con ese DNI");
                window.alert("No se encontró ningún estudiante con ese DNI");
            } else {
                const estudianteEncontrado = querySnapshot.docs[0];
                setEstudianteId(estudianteEncontrado.id);
                const data = estudianteEncontrado.data();

                setFormData({
                    Nombre: data.Nombre || '',
                    Curso: data.Curso || '',
                    dni: data.dni || '',
                    Faltas: data.Faltas || '',
                    Sanciones: data.Sanciones || '',
                    Reportes: data.Reportes || ''
                });
                setMaterias(data.materias || [{ materia: '', nota: '' }]);
                setMateriasPrevias(data.materiasPrevias || [{ materiaPrevia: '', notaMateriaPrevia: '' }]);
            }
        } catch (error) {
            console.error("Error al buscar el estudiante: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el estudiante");
            window.alert("Error al buscar el estudiante");
        }
    };

    return (
        <View style={styles.container}>
            {/* Campo para buscar estudiante por DNI */}
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            {/* Botón para iniciar la búsqueda */}
            <Button title="Buscar" onPress={buscarPorDni} />
            <View style={styles.br}></View>

            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    {/* Campo para el nombre completo */}
                    <Text style={styles.label}>Nombre Completo:</Text>
                    <TextInput
                        placeholder="Nombre Completo"
                        value={formData.Nombre}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {/* Campo para el curso */}
                    <Text style={styles.label}>Curso:</Text>
                    <TextInput
                        placeholder="Curso"
                        value={formData.Curso}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {/* Campo para el DNI */}
                    <Text style={styles.label}>DNI:</Text>
                    <TextInput
                        placeholder="DNI"
                        value={formData.dni}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {/* Campo para las faltas */}
                    <Text style={styles.label}>Faltas:</Text>
                    <TextInput
                        placeholder="Faltas"
                        value={formData.Faltas}
                        style={styles.input}
                    />
                </View>
            </View>

            <Text style={styles.label}>Materias y Notas</Text>
            {/* Campos para las materias y sus respectivas notas */}
            {materias.map((item, index) => (
                <View key={index} style={styles.row}>
                    <TextInput
                        placeholder="Materia"
                        value={item.materia}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Nota"
                        value={item.nota}
                        style={styles.input}
                    />
                </View>
            ))}

            <Text style={styles.label}>Materias Previas</Text>
            {/* Campos para las materias previas y sus respectivas notas */}
            {materiasPrevias.map((item, index) => (
                <View key={index} style={styles.row}>
                    <TextInput
                        placeholder="Materia Previa"
                        value={item.materiaPrevia}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Nota"
                        value={item.notaMateriaPrevia}
                        style={styles.input}
                    />
                </View>
            ))}

            {/* Campo para las sanciones */}
            <Text style={styles.label}>Sanciones:</Text>
            <TextInput
                placeholder="Sanciones"
                value={formData.Sanciones}
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />

            {/* Campo para los reportes del profesor */}
            <Text style={styles.label}>Reportes del Profesor:</Text>
            <TextInput
                placeholder="Reportes"
                value={formData.Reportes}
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />
        </View>
    );
}

export default Enlistar;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    /* Estilo para los campos de entrada de texto */
    input: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        height: 40,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        textAlign: 'center',
    },
    /* Contenedor para los campos de entrada */
    inputContainer: {
        marginBottom: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    /* Estilo para las etiquetas de los campos */
    label: {
        fontFamily: 'arial',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    /* Espacio entre los campos */
    br: {
        height: 10,
    },
    /* Estilo para los campos de texto de varias líneas */
    textarea: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
    },
    /* Estilo para las filas */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
});
