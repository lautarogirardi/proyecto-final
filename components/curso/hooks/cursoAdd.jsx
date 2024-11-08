import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert, View, Text } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function CursoAdd() {
    const [formData, setFormData] = useState({
        NombreCurso: '',
        CodigoCurso: '',
        Descripcion: '',
        Profesores: '',
        Horario: ''
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!formData.NombreCurso || !formData.CodigoCurso || !formData.Descripcion || !formData.Profesores || !formData.Horario) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return;
        }

        try {
            const cursosRef = collection(db, 'cursos');
            const q = query(cursosRef, where("CodigoCurso", "==", formData.CodigoCurso));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                Alert.alert("Error", "Ya existe un curso con este código.");
                return;
            }

            await addDoc(cursosRef, {
                NombreCurso: formData.NombreCurso,
                CodigoCurso: formData.CodigoCurso,
                Descripcion: formData.Descripcion,
                Profesores: formData.Profesores,
                Horario: formData.Horario
            });

            Alert.alert("Éxito", "Curso agregado correctamente");
            setFormData({ NombreCurso: '', CodigoCurso: '', Descripcion: '', Profesores: '', Horario: '' });
        } catch (error) {
            console.error("Error al agregar el curso: ", error);
            Alert.alert("Error", "No se pudo agregar el curso");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Curso</Text>
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
            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}

export default CursoAdd;

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
        marginVertical: 5,
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
