import React, { useState } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, Button } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Componente funcional para agregar un nuevo alumno
function AlumnoAdd() {
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion: ''
    });

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        // Validación de campos obligatorios
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Error: Por favor, complete todos los campos.");
            return;
        }

        try {
            // Referencia a la colección de alumnos
            const alumnosRef = collection(db, 'alumnos');
            // Consulta para verificar si ya existe un alumno con el mismo DNI
            const q = query(alumnosRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            // Verificación de existencia de alumno
            if (!querySnapshot.empty) {
                Alert.alert("Error", "Ya existe un estudiante con este DNI.");
                window.alert("Error: Ya existe un estudiante con este DNI.");
                return;
            }

            // Agregar nuevo alumno a la colección
            await addDoc(alumnosRef, formData);

            Alert.alert("Éxito", "Estudiante agregado correctamente");
            window.alert("Éxito: Estudiante agregado correctamente");

            // Limpiar formulario después de enviar
            setFormData({ Nombre: '', dni: '', Telefono: '', Email: '', Direccion: '' });

        } catch (error) {
            console.error("Error al agregar el usuario: ", error);
            window.alert("Error: No se pudo agregar el usuario");
        }
    };

    return (
        <View style={styles.container}>
            {/* Campo para el nombre completo */}
            <Text style={styles.label}>Nombre Completo:</Text>
            <TextInput
                placeholder="Ingresar Nombre Completo"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}
                style={styles.input}
            />

            {/* Campo para el DNI */}
            <Text style={styles.label}>DNI:</Text>
            <TextInput
                placeholder="Ingresar DNI"
                value={formData.dni}
                onChangeText={(value) => handleChange('dni', value)}
                keyboardType="numeric"
                style={styles.input}
            />

            {/* Campo para el teléfono */}
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
                placeholder="Ingresar Teléfono"
                value={formData.Telefono}
                onChangeText={(value) => handleChange('Telefono', value)}
                keyboardType="phone-pad"
                style={styles.input}
            />

            {/* Campo para el email */}
            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Ingresar Email"
                value={formData.Email}
                onChangeText={(value) => handleChange('Email', value)}
                keyboardType="email-address"
                style={styles.input}
            />

            {/* Campo para la dirección */}
            <Text style={styles.label}>Dirección:</Text>
            <TextInput
                placeholder="Ingresar Dirección"
                value={formData.Direccion}
                onChangeText={(value) => handleChange('Direccion', value)}
                style={styles.input}
            />

            <View style={styles.br}></View>
            {/* Botón para enviar el formulario */}
            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}

export default AlumnoAdd;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    /* Estilo para los campos de entrada de texto */
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
    /* Estilo para las etiquetas de los campos */
    label: {
        marginVertical: 5,
        fontWeight: 'bold',
    },
    /* Espacio entre los campos */
    br: {
        height: 20,
    }
});
