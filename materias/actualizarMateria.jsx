import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
function Actualizar() {
    const [formData, setFormData] = useState({
        materia: ''
    });
    const [materiaBusqueda, setMateriaBusqueda] = useState('');
    const [materiaId, setMateriaId] = useState(null);



    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const buscarPorMateria = async () => {
        if (!materiaBusqueda) {
            Alert.alert("Error", "Por favor, ingrese la materia para buscar");
            window.alert("Error", "Por favor, ingrese la materia para buscar");
            return;
        }

        try {
            const materiaQuery = query(collection(db, 'materias'), where("materia", "==", materiaBusqueda));
            const querySnapshot = await getDocs(materiaQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningúna materia");
                window.alert("No se encontró ningúna materia");
            } else {
                const materiaEncontrada = querySnapshot.docs[0];
                setMateriaId(materiaEncontrada.id);
                const data = materiaEncontrada.data();

                setFormData({
                    Materia: data.materia || ''
                });

            }
        } catch (error) {
            console.error("Error al buscar la materia: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el estudiante");
            window.alert("Error: Ocurrió un error al buscar la materia");
        }
    };


    const handleSubmit = async () => {
        if (!formData.materia) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const materiaQuery = query(
                collection(db, 'materias'),
                where("materia", "==", formData.materia)
            );
            const materiaSnapshot = await getDocs(materiaQuery);

            if (!materiaSnapshot.empty && materiaSnapshot.docs[0].id !== materiaId) {
                Alert.alert("Error", "La materia ya está registrada.");
                window.alert("Error: La materia ya está registrada.");
                return;
            }

            if (materiaId) {
                await updateDoc(doc(db, 'materias', materiaId), {
                    ...formData,
                });
                Alert.alert("Éxito", "materia actualizada correctamente");
                window.alert("Materia actualizada correctamente");
            } else {
                Alert.alert("Error", "Primero busca una materia");
                window.alert("Primero busca una materia");
            }
        } catch (error) {
            console.error("Error al actualizar la materia: ", error);
            Alert.alert("Error", "No se pudo actualizar la materia");
            window.alert("Error: No se pudo actualizar la materia");
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar Materia"
                value={materiaBusqueda}
                onChangeText={setMateriaBusqueda}
                style={styles.input}
            />


            <Button title="Buscar" onPress={buscarPorMateria} />
            <View style={styles.br}></View>


            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.materia}
                onChangeText={(value) => handleChange('materia', value)}
                style={styles.input}
            />


            <Button title="Guardar Cambios" onPress={handleSubmit} color="green" />
        </View>
    );
}

export default Actualizar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    separator: {
        height: 3,
        backgroundColor: 'lightblue',  
        marginVertical: 10,       
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
    labelcenter: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center', // Centra el texto
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
    br: {
        height: 20,
    }
});

