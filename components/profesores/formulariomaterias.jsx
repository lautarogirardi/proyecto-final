import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

const Materias = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Nombre:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.labelText}>DNI:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.labelText}>Teléfono:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.labelText}>Faltas:</Text>
            <TextInput style={styles.input} keyboardType="numeric" />

            <Text style={styles.title}>Materias Asignadas</Text>

            <Text style={styles.labelText}>Materia 1:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.labelText}>Curso 1:</Text>
            <TextInput style={styles.input} />
        </View>
    );
}

export default Materias;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    labelText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '70%',
        padding:0.2,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 0,
    },
});
