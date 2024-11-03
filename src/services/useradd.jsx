import React, { useState } from 'react';
import { db } from '@/firebase';  
import { TextInput, Button, Alert, View, Text } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';

function Formulario() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        dni: ''
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Apellido || !formData.dni) {
            console.log("Error", "Por favor, complete todos los campos.");
            return;
        }

        try {
            await addDoc(collection(db, 'alumno'), {
                Nombre: formData.Nombre,
                Apellido: formData.Apellido,
                dni: formData.dni
            });
            console.log('User added!');
            Alert.alert("Éxito", "Usuario agregado correctamente");
            setFormData({ Nombre: '', Apellido: '', dni: '' });
        } catch (error) {
            console.error("Error al agregar el usuario: ", error);
            Alert.alert("Error", "No se pudo agregar el usuario");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nombre:</Text>
            <TextInput
                placeholder="Ingrese su nombre"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <Text>Apellido:</Text>
            <TextInput
                placeholder="Ingrese su apellido"
                value={formData.Apellido}
                onChangeText={(value) => handleChange('Apellido', value)}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <Text>DNI:</Text>
            <TextInput
                placeholder="Ingrese su DNI"
                value={formData.dni}
                onChangeText={(value) => handleChange('dni', value)}
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}

export default Formulario;
