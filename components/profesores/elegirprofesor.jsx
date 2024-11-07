import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { db } from '../../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

function ElegirP() {
    const [selectedProfesor, setSelectedProfesor] = useState('');

    const handleSelectChange = async (event) => {
        const profesor = event.target.value;
        setSelectedProfesor(profesor);
        try {
            await addDoc(collection(db, 'profesores'), {
                profesor: profesor,
                timestamp: new Date(),
            });
            alert('Profesor seleccionado: ' + profesor);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Elegir Profesor:</Text>
            <select id="elegirP" onChange={handleSelectChange}>
                <option value="">Selecciona un profesor</option>
                <option value="profesor1">Profesor 1</option>
                <option value="profesor2">Profesor 2</option>
                <option value="profesor3">Profesor 3</option>
            </select>
        </View>
    );
}

export default ElegirP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 10,
    },
    labelText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
    },
});
