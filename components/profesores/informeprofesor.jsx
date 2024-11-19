import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

// Componente funcional para generar un informe
function Informe() {
    return (
        <View style={styles.container}>
            <label htmlFor="sanciones" style={styles.label}>Puntuación:</label>
            <input type="text" id="sanciones" name="sanciones" style={styles.input} /><br />
            
            <label htmlFor="razon" style={styles.label}>Reportes:</label>
            <textarea name="razon" cols="50" rows="10" id="razon" style={styles.input}></textarea><br />
        </View>
    );
}

export default Informe;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.0)', 
        padding: 20,
        fontFamily: 'arial',
        fontWeight: 'bold',
    },
    /* Estilo para los campos de entrada de texto */
    input: {
        width: '100%',
        borderRadius: 10,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    /* Estilo para las etiquetas */
    label: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    }
});
