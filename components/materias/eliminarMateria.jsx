
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function Eliminar() {
    const [materiaBusqueda, setMateriaBusqueda] = useState('');
    const [materiaId, setMateriaId] = useState(null);
    const [formData, setFormData] = useState(null); 

    const buscarPorMateria = async () => {
        if (!materiaBusqueda) {
            window.alert("Error: Por favor, ingrese una materia para buscar");
            Alert.alert("Error", "Por favor, ingrese una materia para buscar");
            return;
        }

        try {
            const materiaQuery = query(
                collection(db, 'materias'),
                where("materia", "==", materiaBusqueda)
            );
            const querySnapshot = await getDocs(materiaQuery);

            if (querySnapshot.empty) {
                window.alert("No se encontró ningúna materia con ese DNI");
                Alert.alert("No encontrado", "No se encontró ningúna materia con ese DNI");
            } else {
                const materiaEncontrado = querySnapshot.docs[0];
                setMateriaId(materiaEncontrado.id);
                setFormData(materiaEncontrado.data());
                window.alert("Materia Encontrado");
                Alert.alert("Materia encontrado", "Puedes eliminarla ahora");
            }
        } catch (error) {
            console.error("Error al buscar la materia: ", error);
            window.alert("Ocurrió un error al buscar la materia");
            Alert.alert("Error", "Ocurrió un error al buscar la materia");
        }
    };

    const eliminarMateria = async () => {
        if (!materiaId) {
            window.alert("Primero busca una materia");
            Alert.alert("Error", "Primero busca una materia");
            return;
        }

        try {
            await deleteDoc(doc(db, 'materias', materiaId));
            window.alert("La materia ha sido eliminada correctamente");
            Alert.alert("Materia eliminada", "La materia ha sido eliminada correctamente");
            setMateriaId(null);
            setFormData(null);
            setMateriaBusqueda('');
        } catch (error) {
            console.error("Error al eliminar la materia: ", error);
            window.alert("No se pudo eliminar la materia");
            Alert.alert("Error", "No se pudo eliminar la materia");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label} >BUSCAR: </Text>
            <TextInput
                placeholder="Buscar materia"
                value={materiaBusqueda}
                onChangeText={setMateriaBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorMateria} />

            {formData && (
                <View style={styles.container}>
                    <Text style={styles.label}>Materia: {formData.materia}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Materia"
                        onPress={eliminarMateria}
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
