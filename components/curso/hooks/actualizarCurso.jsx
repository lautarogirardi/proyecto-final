import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function ActualizarCurso() {
    const [formData, setFormData] = useState({
        NombreCurso: '',
        Division: '',
        Descripcion: '',
        Profesores: '',
        Horario: ''
    });
    const [cursoId, setCursoId] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState('');

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const cursosCollection = collection(db, 'cursos');
                const cursosSnapshot = await getDocs(cursosCollection);
                const cursosList = cursosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCursos(cursosList);
            } catch (error) {
                console.error("Error al obtener los cursos: ", error);
            }
        };
        fetchCursos();
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value !== undefined ? value : '' // Asegúrate de que el valor no sea undefined
        });
    };

    const handleCursoChange = (cursoId) => {
        setSelectedCurso(cursoId);
        const selectedCursoData = cursos.find(curso => curso.id === cursoId);
        if (selectedCursoData) {
            setFormData({
                NombreCurso: selectedCursoData.NombreCurso || '',
                Division: selectedCursoData.Division || '',
                Descripcion: selectedCursoData.Descripcion || '',
                Profesores: selectedCursoData.Profesores || '',
                Horario: selectedCursoData.Horario || ''
            });
            setCursoId(cursoId);
        }
    };

    const handleSubmit = async () => {
        if (!formData.NombreCurso || !formData.Division || !formData.Descripcion || !formData.Profesores || !formData.Horario) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return;
        }

        try {
            if (cursoId) {
                await updateDoc(doc(db, 'cursos', cursoId), formData);
                Alert.alert("Éxito", "Curso actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un curso");
            }
        } catch (error) {
            console.error("Error al actualizar el curso: ", error);
            Alert.alert("Error", "No se pudo actualizar el curso");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Curso:</Text>
            <Picker
                selectedValue={selectedCurso}
                onValueChange={handleCursoChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Curso" value="" />
                {cursos.map(curso => (
                    <Picker.Item key={curso.id} label={`${curso.NombreCurso} - ${curso.Division}`} value={curso.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Nombre del Curso:</Text>
            <TextInput
                placeholder="Ingresar Nombre del Curso"
                value={formData.NombreCurso}
                onChangeText={(value) => handleChange('NombreCurso', value)}
                style={styles.input}
            />
            <Text style={styles.label}>División:</Text>
            <TextInput
                placeholder="Ingresar División"
                value={formData.Division}
                onChangeText={(value) => handleChange('Division', value)}
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
