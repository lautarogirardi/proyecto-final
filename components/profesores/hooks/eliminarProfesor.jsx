import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function EliminarP() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [profesorId, setProfesorId] = useState(null);
    const [formData, setFormData] = useState(null); 

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const profesorQuery = query(
                collection(db, 'profesores'),
                where("dni", "==", dniBusqueda)
            );
            const querySnapshot = await getDocs(profesorQuery);

            if (querySnapshot.empty) {
                window.alert("No se encontró ningún profesor con ese DNI");
                Alert.alert("No encontrado", "No se encontró ningún profesor con ese DNI");
            } else {
                const profesorEncontrado = querySnapshot.docs[0];
                setProfesorId(profesorEncontrado.id);
                setFormData(profesorEncontrado.data());
                window.alert("Profesor Encontrado");
                Alert.alert("Profesor encontrado", "Puedes eliminarlo ahora");
            }
        } catch (error) {
            console.error("Error al buscar el profesor: ", error);
            window.alert("Ocurrió un error al buscar el profesor");
            Alert.alert("Error", "Ocurrió un error al buscar el profesor");
        }
    };

    const eliminarProfesor = async () => {
        if (!profesorId) {
            window.alert("Primero busca un profesor por DNI");
            Alert.alert("Error", "Primero busca un profesor por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'profesores', profesorId));
            window.alert("El profesor ha sido eliminado correctamente");
            Alert.alert("Profesor eliminado", "El profesor ha sido eliminado correctamente");
            setProfesorId(null);
            setFormData(null);
            setDniBusqueda('');
        } catch (error) {
            console.error("Error al eliminar el profesor: ", error);
            window.alert("No se pudo eliminar el profesor");
            Alert.alert("Error", "No se pudo eliminar el profesor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label} >BUSCAR: </Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

            {formData && (
                <View style={styles.container}>
                    <Text style={styles.label}>Nombre: {formData.Nombre}</Text>
                    <Text style={styles.label}>Curso: {formData.Cursos}</Text>
                    <Text style={styles.label}>Materia: {formData.Materias}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Profesor"
                        onPress={eliminarProfesor}
                        color="red"
                    />
                </View>
            )}
        </View>
    );
}

export default EliminarP;

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
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',

    },
    label: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    br:{
        height:10,
    }

});