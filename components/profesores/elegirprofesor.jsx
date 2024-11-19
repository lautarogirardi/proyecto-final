import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

// Componente funcional para seleccionar un profesor
function ElegirP() {
    return (
        <View style={styles.container}>
            <label style={styles.label}>Elegir Profesor: </label>
            <select id="elegirP" style={styles.select}>
                <option value="profesor1">Profesor 1</option>
                <option value="profesor2">Profesor 2</option>
                <option value="profesor3">Profesor 3</option>
            </select>
        </View>
    );
}

export default ElegirP;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        backgroundColor: 'transparent',
    },
    /* Estilo para los títulos */
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    /* Separador */
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    /* Estilo para el texto de las etiquetas */
    labelText: {
        color: 'white',
    },
    /* Estilo para los selectores */
    select: {
        width: '100%', 
        maxWidth: 300, 
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderWidth: 1,
        borderColor: 'lightblue',
        fontFamily: 'arial',
        fontWeight: 'bold',
    },
    /* Estilo para las etiquetas */
    label: {
        fontFamily: 'arial',
        fontWeight: 'bold',
    },
});
