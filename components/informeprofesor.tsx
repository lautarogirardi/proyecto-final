import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

const Informe: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Puntuación:</Text>
            <TextInput style={styles.input} keyboardType="numeric" />

            <Text style={styles.labelText}>Reportes:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline={true}
                numberOfLines={10}
            />
        </View>
    );
}

export default Informe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    labelText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 15,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top', // Asegura que el texto comience en la parte superior del TextInput
    },
});
