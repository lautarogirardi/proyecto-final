import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

function PreceptorEnlistar() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Reportes: ''
    });
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [preceptorId, setPreceptorId] = useState(null);

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const preceptorQuery = query(collection(db, 'preceptores'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(preceptorQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún preceptor con ese DNI");
                window.alert("No se encontró ningún preceptor con ese DNI");
            } else {
                const preceptorEncontrado = querySnapshot.docs[0];
                setPreceptorId(preceptorEncontrado.id);
                const data = preceptorEncontrado.data();

                setFormData({
                    Nombre: data.Nombre || '',
                    Curso: data.Curso || '',
                    dni: data.dni || '',
                    Faltas: data.Faltas || '',
                    Sanciones: data.Sanciones || '',
                    Reportes: data.Reportes || ''
                });
            }
        } catch (error) {
            console.error("Error al buscar el preceptor: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el preceptor");
            window.alert("Error al buscar el preceptor");
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
            <View style={styles.br} ></View>
            <View style={styles.row}>
                <View style={styles.inputContainer} >
                    <Text style={styles.label}>Nombre Completo:</Text>
                    <TextInput
                        placeholder="Nombre Completo"
                        value={formData.Nombre}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Curso:</Text>
                    <TextInput
                        placeholder="Curso"
                        value={formData.Curso}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer} >
                    <Text style={styles.label}>DNI:</Text>
                    <TextInput
                        placeholder="DNI"
                        value={formData.dni}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer} >
                    <Text style={styles.label}>Faltas:</Text>
                    <TextInput
                        placeholder="Faltas"
                        value={formData.Faltas}
                        style={styles.input}
                    />
                </View>
            </View>

            <Text style={styles.label}>Sanciones:</Text>
            <TextInput
                placeholder="Sanciones"
                value={formData.Sanciones}
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />

            <Text style={styles.label}>Reportes:</Text>
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

export default PreceptorEnlistar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
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
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        fontFamily: 'arial',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    br: {
        height: 10,
    },
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
    }
});
