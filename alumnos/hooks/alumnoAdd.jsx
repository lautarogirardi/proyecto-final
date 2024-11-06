import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { TextInput, Button, Alert, View, Text } from 'react-native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function AlumnoAdd() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Materia: '',
        Nota: '',
        MateriaPrevia: '',
        Sanciones:'',
        Reportes:''
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Curso || !formData.dni || !formData.Faltas || !formData.Materia || !formData.Nota || !formData.MateriaPrevia || !formData.Reportes || !formData.Sanciones) {
            window.alert("Error: Por favor, complete todos los campos.");
            console.log("Error", "Por favor, complete todos los campos.");
            return;
        }


        try {
            const alumnosRef = collection(db, 'alumnos');
            const q = query(alumnosRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                window.alert('Ya existe un estudiante con ese DNI');
                Alert.alert("Error", "Ya existe un estudiante con este DNI.");
                return;
            }

            await addDoc(alumnosRef, {
                Nombre: formData.Nombre,
                Curso: formData.Curso,
                dni: formData.dni,
                Faltas: formData.Faltas,
                Materia: formData.Materia,
                Nota: formData.Nota,
                MateriaPrevia: formData.MateriaPrevia,
                Sanciones: formData.Sanciones,
                Reportes: formData.Reportes
            });
            console.log('User added!');
            Alert.alert("Éxito", "Estudiante agregado correctamente");
            window.alert("Estudiante agregado correctamente");
            setFormData({ Nombre: '', Curso: '', dni: '', Faltas: '', Materia: '', Nota: '', MateriaPrevia: '', Sanciones: '', Reportes: '' });
        } catch (error) {
            console.error("Error al agregar el usuario: ", error);
            window.alert("No se pudo agregar el estudiante");
            Alert.alert("Error", "No se pudo agregar el usuario");
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
            <h3 style={styles.label}>Materias y Notas</h3>
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

            <Text style={styles.label}>Materia Previa:</Text>
            <TextInput
                placeholder="Ingresar Materia Previa"
                value={formData.MateriaPrevia}
                onChangeText={(value) => handleChange('MateriaPrevia', value)}
                style={styles.input}
            />
            <h3 style={styles.label}>Comportamiento:</h3>
            <Text style={styles.label}>Sanciones:</Text>
            <TextInput
                placeholder="Ingresar Sanciones"
                value={formData.Sanciones}
                onChangeText={(value) => handleChange('Sanciones', value)}
                multiline={true}
                numberOfLines={15} 
                textAlignVertical="top"
                style={styles.textarea}
            />

            <Text style={styles.label}>Reportes del Profesor:</Text>
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
/* Nombre Curso dni Faltas Materia Nota MateriaPrevia */


export default AlumnoAdd;

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

