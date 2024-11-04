import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

function ActualizarP() {
    
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion:'',
        Faltas:'',
        Materias: '',
        Cursos: '',
        Puntuacion: '',
        Reportes:''
    });
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [profesorId, setProfesorId] = useState(null);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const profesorQuery = query(collection(db, 'profesores'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(profesorQuery);

            if (querySnapshot.empty) {
                window.alert("No se encontró ningún profesor con ese DNI");
                Alert.alert("No encontrado", "No se encontró ningún profesor con ese DNI");
            } else {
                const profesorEncontrado = querySnapshot.docs[0];
                setProfesorId(profesorEncontrado.id);
                setFormData(profesorEncontrado.data());
            }
        } catch (error) {
            console.error("Error al buscar el profesor: ", error);
            window.alert("Error", "Ocurrió un error al buscar el profesor");
            Alert.alert("Error", "Ocurrió un error al buscar el profesor");
        }
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion || !formData.Faltas || !formData.Materias || !formData.Cursos || !formData.Puntuacion ) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Error: Por favor, complete todos los campos.");
            return;
        }

        try {
            if (profesorId) {
                await updateDoc(doc(db, 'profesores', profesorId), formData);
                window.alert("Éxito: Profesor actualizado correctamente");
                Alert.alert("Éxito", "Profesor actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un profesor por DNI");
            }
        } catch (error) {
            console.error("Error al actualizar el profesor: ", error);
            window.alert("Error: No se pudo actualizar el profesor");
            Alert.alert("Error", "No se pudo actualizar el profesor");
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
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

            <Text style={styles.label}>Nombre Completo:</Text>
            <TextInput
                placeholder="Ingresar Nombre Completo"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}
                style={styles.input}
            />

            <Text style={styles.label}>DNI:</Text>
            <TextInput
                placeholder="Ingresar DNI"
                value={formData.dni}
                onChangeText={(value) => handleChange('dni', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Telefono:</Text>
            <TextInput
                placeholder="Ingresar Telefono"
                value={formData.Telefono}
                onChangeText={(value) => handleChange('Telefono', value)}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Ingresar Email"
                value={formData.Email}
                onChangeText={(value) => handleChange('Email', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Direccion:</Text>

            <TextInput
                placeholder="Ingresar Direccion"
                value={formData.Direccion}
                onChangeText={(value) => handleChange('Direccion', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Faltas:</Text>
            <TextInput
                placeholder="Ingresar Faltas"
                value={formData.Faltas}
                onChangeText={(value) => handleChange('Faltas', value)}
                style={styles.input}
            />
            <h3 style={styles.label}>Materias Asignadas</h3>
            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.Materias}
                onChangeText={(value) => handleChange('Materias', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Curso:</Text>
            <TextInput
                placeholder="Ingresar Curso"
                value={formData.Cursos}
                onChangeText={(value) => handleChange('Cursos', value)}
                style={styles.input}
            />
            <h3 style={styles.label}>Comportamiento:</h3>
            <Text style={styles.label}>Puntuacion:</Text>
            <TextInput
                placeholder="Ingresar Puntuacion"
                value={formData.Puntuacion}
                onChangeText={(value) => handleChange('Puntuacion', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Reportes:</Text>
            <TextInput
                placeholder="Ingresar Reportes"
                value={formData.Reportes}
                onChangeText={(value) => handleChange('Reportes', value)}
                multiline={true}
                numberOfLines={15} 
                textAlignVertical="top"
                style={styles.textarea}
            />

            <View style={styles.br} />
            <Button title="Enviar" onPress={handleSubmit}  />
        </View>
    );
}

export default ActualizarP;

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
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',

    },
    label: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    br:{
        height:20,
    },
    textarea:{
        padding: 5,
        width: '100%',
        borderRadius: 15,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'arial',
        marginVertical: 5,  
        color: '#000',
    },

});
