import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function Eliminar() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);
    const [formData, setFormData] = useState(null); 

    const buscarPorDni = useCallback(async () => {
        if (!dniBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const estudianteQuery = query(
                collection(db, 'alumnos'),
                where("dni", "==", dniBusqueda)
            );
            const querySnapshot = await getDocs(estudianteQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún estudiante con ese DNI");
            } else {
                const estudianteEncontrado = querySnapshot.docs[0];
                setEstudianteId(estudianteEncontrado.id);
                setFormData(estudianteEncontrado.data());
                Alert.alert("Estudiante encontrado", "Puedes eliminarlo ahora");
            }
        } catch (error) {
            console.error("Error al buscar el estudiante: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el estudiante");
        }
    }, [dniBusqueda]);

    const eliminarEstudiante = useCallback(async () => {
        if (!estudianteId) {
            Alert.alert("Error", "Primero busca un estudiante por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'alumnos', estudianteId));
            Alert.alert("Estudiante eliminado", "El estudiante ha sido eliminado correctamente");
            setEstudianteId(null);
            setFormData(null);
            setDniBusqueda('');
        } catch (error) {
            console.error("Error al eliminar el estudiante: ", error);
            Alert.alert("Error", "No se pudo eliminar el estudiante");
        }
    }, [estudianteId]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>BUSCAR:</Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Nombre: {formData.Nombre}</Text>
                    <Text style={styles.label}>Curso: {formData.Curso}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Estudiante"
                        onPress={eliminarEstudiante}
                        color="red"
                    />
                </View>
            )}
        </View>
    );
}

export default Eliminar;

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
        borderRadius: 15,
        height: 40,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginVertical: 5,
        color: '#000',
    },
    label: {
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    br: {
        height: 10,
    },
    resultContainer: {
        marginTop: 20,
    },
});