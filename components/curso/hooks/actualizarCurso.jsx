import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

function ActualizarCurso() {
    const [formData, setFormData] = useState({
        NombreCurso: '',
        CodigoCurso: '',
        Descripcion: '',
        Profesores: '',
        Horario: ''
    });
    const [codigoBusqueda, setCodigoBusqueda] = useState('');
    const [cursoId, setCursoId] = useState(null);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const buscarPorCodigo = async () => {
        if (!codigoBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un código de curso para buscar");
            return;
        }

        try {
            const cursoQuery = query(collection(db, 'cursos'), where("CodigoCurso", "==", codigoBusqueda));
            const querySnapshot = await getDocs(cursoQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún curso con ese código");
            } else {
                const cursoEncontrado = querySnapshot.docs[0];
                setCursoId(cursoEncontrado.id);
                setFormData(cursoEncontrado.data());
            }
        } catch (error) {
            console.error("Error al buscar el curso: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el curso");
        }
    };

    const handleSubmit = async () => {
        if (!formData.NombreCurso || !formData.CodigoCurso || !formData.Descripcion || !formData.Profesores || !formData.Horario) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return;
        }

        try {
            if (cursoId) {
                await updateDoc(doc(db, 'cursos', cursoId), formData);
                Alert.alert("Éxito", "Curso actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un curso por su código");
            }
        } catch (error) {
            console.error("Error al actualizar el curso: ", error);
            Alert.alert("Error", "No se pudo actualizar el curso");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por Código"
                value={codigoBusqueda}
                onChangeText={setCodigoBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorCodigo} />

            <Text style={styles.label}>Nombre del Curso:</Text>
            <TextInput
                placeholder="Ingresar Nombre del Curso"
                value={formData.NombreCurso}
                onChangeText={(value) => handleChange('NombreCurso', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Código del Curso:</Text>
            <TextInput
                placeholder="Ingresar Código del Curso"
                value={formData.CodigoCurso}
                onChangeText={(value) => handleChange('CodigoCurso', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                placeholder="Ingresar Descripción"
                value={formData.Descripcion}
                onChangeText={(value) => handleChange('Descripcion', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Profesores:</Text>
            <TextInput
                placeholder="Ingresar Profesores"
                value={formData.Profesores}
                onChangeText={(value) => handleChange('Profesores', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Horario:</Text>
            <TextInput
                placeholder="Ingresar Horario"
                value={formData.Horario}
                onChangeText={(value) => handleChange('Horario', value)}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Guardar Cambios" onPress={handleSubmit} />
        </View>
    );
}

export default ActualizarCurso;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
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
        color: '#000',
    },
    label: {
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    br: {
        height: 20,
    },
});
