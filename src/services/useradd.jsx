import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

function Formulario() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Materia: '',
        Nota: '',
        MateriaPrevia: ''
    });
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const estudianteQuery = query(collection(db, 'alumno'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(estudianteQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún estudiante con ese DNI");
            } else {
                const estudianteEncontrado = querySnapshot.docs[0];
                setEstudianteId(estudianteEncontrado.id);
                setFormData(estudianteEncontrado.data());
            }
        } catch (error) {
            console.error("Error al buscar el estudiante: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el estudiante");
        }
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Curso || !formData.dni || !formData.Faltas || !formData.Materia || !formData.Nota || !formData.MateriaPrevia) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return;
        }

        try {
            if (estudianteId) {
                // Actualizar estudiante existente
                await updateDoc(doc(db, 'alumno', estudianteId), formData);
                Alert.alert("Éxito", "Estudiante actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un estudiante por DNI");
            }
        } catch (error) {
            console.error("Error al actualizar el estudiante: ", error);
            Alert.alert("Error", "No se pudo actualizar el estudiante");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <Button title="Buscar" onPress={buscarPorDni} />

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                placeholder="Ingresar Nombre"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Curso:</Text>
            <TextInput
                placeholder="Ingresar Curso"
                value={formData.Curso}
                onChangeText={(value) => handleChange('Curso', value)}
                style={styles.input}
            />
            <Text style={styles.label}>DNI:</Text>
            <TextInput
                placeholder="Ingresar DNI"
                value={formData.dni}
                onChangeText={(value) => handleChange('dni', value)}
                keyboardType="numeric"
                style={styles.input}
            />
            <Text style={styles.label}>Faltas:</Text>
            <TextInput
                placeholder="Ingresar Faltas"
                value={formData.Faltas}
                onChangeText={(value) => handleChange('Faltas', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.Materia}
                onChangeText={(value) => handleChange('Materia', value)}
                style={styles.input}
            />
            <Text style={styles.label}>Nota:</Text>
            <TextInput
                placeholder="Ingresar Nota"
                value={formData.Nota}
                onChangeText={(value) => handleChange('Nota', value)}
                style={styles.input}
            />
            <Text style={styles.label}>MateriaPrevia:</Text>
            <TextInput
                placeholder="Ingresar MateriaPrevia"
                value={formData.MateriaPrevia}
                onChangeText={(value) => handleChange('MateriaPrevia', value)}
                style={styles.input}
            />
            <Button title="Guardar Cambios" onPress={handleSubmit} />
        </View>
    );
}

export default Formulario;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        borderRadius: 5,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
