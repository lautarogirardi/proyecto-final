import React, { useState } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, Button } from 'react-native';
import { db } from '@/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function AgregarMateria() {
    const [formData, setFormData] = useState({
        materia: '',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!formData.materia ) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert( "Por favor, complete todos los campos.");
            return;
        }

        try {
            const materiaRef = collection(db, 'materias');
            const q = query(materiaRef, where("materia", "==", formData.materia));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                Alert.alert("Error", "Ya existe esa materia.");
                window.alert("Error: Ya existe esa materia.");
                return;
            }

            await addDoc(materiaRef, formData);

            Alert.alert("Éxito", "Materia agregada correctamente");
            window.alert("Éxito: Materia agregada correctamente");

            setFormData({ materia: ''});

        } catch (error) {
            console.error("Error al agregar materia: ", error);
            Alert.alert("Error", "No se pudo agregar la materia");
            window.alert("Error: No se pudo agregar la materia");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.materia}
                onChangeText={(value) => handleChange('materia', value)}
                style={styles.input}
            />



            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}

export default AgregarMateria;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        fontWeight: 'bold',
    },
    textarea: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginVertical: 5,  
        color: '#000',
    },
});
