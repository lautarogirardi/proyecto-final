import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { TextInput, Button, Alert, View, Text } from 'react-native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function ProfesorAdd() {
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion:''
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion ) {
            window.alert("Error: Por favor, complete todos los campos.");
            console.log("Error", "Por favor, complete todos los campos.");
            return;
        }


        try {
            const profesoresRef = collection(db, 'profesores');
            const q = query(profesoresRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                window.alert('Ya existe un profesor con ese DNI');
                Alert.alert("Error", "Ya existe un profesor con este DNI.");
                return;
            }

            await addDoc(profesoresRef, {
                Nombre: formData.Nombre,
                dni: formData.dni,
                Telefono: formData.Telefono,
                Email: formData.Email,
                Direccion: formData.Direccion
            });
            console.log('User added!');
            Alert.alert("Éxito", "Profesor agregado correctamente");
            window.alert("Profesor agregado correctamente");
            setFormData({ Nombre: '', dni: '', Telefono: '', Email: '', Direccion: '' });
        } catch (error) {
            console.error("Error al agregar el profesor: ", error);
            window.alert("No se pudo agregar el profesor");
            Alert.alert("Error", "No se pudo agregar el profesor");
        }
    };

    return (
        <View style={styles.container}>
            <h3 style={styles.label}>Informe</h3>
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
            <View style={styles.br} />
            <Button title="Enviar" onPress={handleSubmit}  />
        </View>
    );
}



export default ProfesorAdd;

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

