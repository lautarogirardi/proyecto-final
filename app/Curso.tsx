import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';

const FormScreen = () => {
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [divisionSeleccionada, setDivisionSeleccionada] = useState('');

    // Opciones de cursos y divisiones
    const cursos = ['1°', '2°', '3°', '4°', '5°', '6°'];
    const divisiones = ['1°', '2°', '3°', '4°', '5°'];

    return (
        <ImageBackground
            source={require('../epet23.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <BlurView intensity={50} style={styles.blurView}>
                    <Text style={styles.title}>Cursos de la Institución</Text>

                    {/* Picker para seleccionar curso */}
                    <Picker
                        selectedValue={cursoSeleccionado}
                        style={styles.input}
                        onValueChange={(itemValue) => setCursoSeleccionado(itemValue)}
                    >
                        <Picker.Item label="Selecciona un Curso" value="" />
                        {cursos.map((curso, index) => (
                            <Picker.Item key={index} label={curso} value={curso} />
                        ))}
                    </Picker>

                    {/* Picker para seleccionar división */}
                    <Picker
                        selectedValue={divisionSeleccionada}
                        style={styles.input}
                        onValueChange={(itemValue) => setDivisionSeleccionada(itemValue)}
                    >
                        <Picker.Item label="Selecciona la división" value="" />
                        {divisiones.map((division, index) => (
                            <Picker.Item key={index} label={division} value={division} />
                        ))}
                    </Picker>

                    {/* Botón para buscar los datos */}
                    <Link href={'/CursoSeleccionado'}>
                        <Text style={styles.button}>Buscar</Text>
                    </Link>
                </BlurView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    blurView: {
        width: '40%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        width: 200,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        color: 'white',
    },
});

export default FormScreen;