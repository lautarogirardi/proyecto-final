import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

// Componente funcional para la gestión de materias
function Materias() {
    return (
        <View style={styles.container}>
            <label htmlFor="nombre" style={styles.label}>Nombre:</label>
            <input type="text" id="nombre" name="nombre" style={styles.input} />
            
            <label htmlFor="dni" style={styles.label}>DNI:</label>
            <input type="text" id="dni" name="dni" style={styles.input} /><br />
            
            <label htmlFor="telefono" style={styles.label}>Teléfono:</label>
            <input type="text" id="telefono" name="telefono" style={styles.input} /><br />
            
            <label htmlFor="faltas" style={styles.label}>Faltas:</label>
            <input type="text" id="faltas" name="faltas" style={styles.input} />
            
            <h3 style={styles.label}>Materias Asignadas</h3>
            
            <label htmlFor="materia1" style={styles.label}>Materia 1:</label>
            <input type="text" id="materia1" name="materia1" style={styles.input} />
            
            <label htmlFor="curso1" style={styles.label}>Curso 1:</label>
            <input type="text" id="curso1" name="curso1" style={styles.input} />
        </View>
    );
}

export default Materias;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.0)', 
        padding: 20,
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
