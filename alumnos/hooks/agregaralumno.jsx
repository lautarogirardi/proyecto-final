import React, { useState } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, Button } from 'react-native';
import { db } from '@/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function AlumnoAdd() {
    const [formData, setFormData] = useState({ //el estado formdta contiene los datos del alumno
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion: ''
    });

    const handleChange = (name, value) => { //reinicia los valores del formulario
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => { //cuando se presiona el boton de enviar
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion) { //validacion: se debe completar todos los campos del formulario para poder enviarlo
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Error: Por favor, complete todos los campos.");
            return;
        }

        try {
            const alumnosRef = collection(db, 'alumnos'); //llamamos la coleccion alumnos
            const q = query(alumnosRef, where("dni", "==", formData.dni));//se crea la consulta, si se encuantra un dni igual en la coleccion, al enviado
            const querySnapshot = await getDocs(q); //se ejecuta la consulta

            if (!querySnapshot.empty) { // validacion no se puede agregar un dni ya registrado
                Alert.alert("Error", "Ya existe un alumno con este DNI.");
                window.alert("Error: Ya existe un alumno con este DNI.");
                return;
            }

            await addDoc(alumnosRef, formData);// Agrega un nuevo documento a la colección alumnosRef con los datos del formulario

            Alert.alert("Éxito", "Alumno agregado correctamente");
            window.alert("Éxito: Alumno agregado correctamente");

            setFormData({ Nombre: '', dni: '', Telefono: '', Email: '', Direccion: '' });// Reinicia los el formulario a valores vacios

        } catch (error) {
            console.error("Error al agregar el alumno: ", error);
            window.alert("Error: No se pudo agregar el alumno");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre Completo:</Text>
            <TextInput
                placeholder="Ingresar Nombre Completo"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}// actualiza el value co el valor ingresado por teclado 
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

            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
                placeholder="Ingresar Teléfono"
                value={formData.Telefono}
                onChangeText={(value) => handleChange('Telefono', value)}
                keyboardType="phone-pad"
                style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Ingresar Email"
                value={formData.Email}
                onChangeText={(value) => handleChange('Email', value)}
                keyboardType="email-address"
                style={styles.input}
            />

            <Text style={styles.label}>Dirección:</Text>
            <TextInput
                placeholder="Ingresar Dirección"
                value={formData.Direccion}
                onChangeText={(value) => handleChange('Direccion', value)}
                style={styles.input}
            />
            <View style={styles.br}></View>
            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}

export default AlumnoAdd;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        fontWeight: 'bold',
    },
    textarea: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginVertical: 5,  
        color: '#000',
    },
    br: {
        height: 20,
    }
});
