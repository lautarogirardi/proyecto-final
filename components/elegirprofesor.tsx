import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

function ElegirP() {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Elegir Profesor:</Text>
            <select id="elegirP">
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
