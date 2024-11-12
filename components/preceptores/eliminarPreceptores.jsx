import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function EliminarPreceptor() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [preceptorId, setPreceptorId] = useState(null);
    const [formData, setFormData] = useState(null); 

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const preceptorQuery = query(
                collection(db, 'preceptores'),
                where("dni", "==", dniBusqueda)
            );
            const querySnapshot = await getDocs(preceptorQuery);

            if (querySnapshot.empty) {
                window.alert("No se encontró ningún preceptor con ese DNI");
                Alert.alert("No encontrado", "No se encontró ningún preceptor con ese DNI");
            } else {
                const preceptorEncontrado = querySnapshot.docs[0];
                setPreceptorId(preceptorEncontrado.id);
                setFormData(preceptorEncontrado.data());
                window.alert("Preceptor Encontrado");
                Alert.alert("Preceptor encontrado", "Puedes eliminarlo ahora");
            }
        } catch (error) {
            console.error("Error al buscar el preceptor: ", error);
            window.alert("Ocurrió un error al buscar el preceptor");
            Alert.alert("Error", "Ocurrió un error al buscar el preceptor");
        }
    };

    const eliminarPreceptor = async () => {
        if (!preceptorId) {
            window.alert("Primero busca un preceptor por DNI");
            Alert.alert("Error", "Primero busca un preceptor por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'preceptores', preceptorId));
            window.alert("El preceptor ha sido eliminado correctamente");
            Alert.alert("Preceptor eliminado", "El preceptor ha sido eliminado correctamente");
            setPreceptorId(null);
            setFormData(null);
            setDniBusqueda('');
        } catch (error) {
            console.error("Error al eliminar el preceptor: ", error);
            window.alert("No se pudo eliminar el preceptor");
            Alert.alert("Error", "No se pudo eliminar el preceptor");
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
                    <Text style={styles.label}>Curso: {formData.Curso}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Preceptor"
                        onPress={eliminarPreceptor}
                        color="red"
                    />
                </View>
            )}
        </View>
    );
}

export default EliminarPreceptor;

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
    br: {
        height: 10,
    }
});
