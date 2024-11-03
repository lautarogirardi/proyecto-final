import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { TextInput, Button, Alert, View, Text } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';

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

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };
    /* Nombre Curso dni Faltas Materia Nota MateriaPrevia */

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Curso || !formData.dni || !formData.Faltas || !formData.Materia || !formData.Nota || !formData.MateriaPrevia) {
            console.log("Error", "Por favor, complete todos los campos.");
            return;
        }

        try {
            await addDoc(collection(db, 'alumno'), {
                Nombre: formData.Nombre,
                Curso: formData.Curso,
                dni: formData.dni,
                Faltas: formData.Faltas,
                Materia: formData.Materia,
                Nota: formData.Nota,
                MateriaPrevia: formData.MateriaPrevia

            });
            console.log('User added!');
            Alert.alert("Éxito", "Usuario agregado correctamente");
            setFormData({ Nombre: '', Curso: '', dni: '', Faltas: '', Materia: '', Nota: '', MateriaPrevia: '' });
        } catch (error) {
            console.error("Error al agregar el usuario: ", error);
            Alert.alert("Error", "No se pudo agregar el usuario");
        }
    };

    return (
        <View style={styles.container}>
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
                placeholder="Ingresar Curso"
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

            <Text style={styles.label}>MateriaPrevia:</Text>
            <TextInput
                placeholder="Ingresar MateriaPrevia"
                value={formData.MateriaPrevia}
                onChangeText={(value) => handleChange('MateriaPrevia', value)}
                style={styles.input}
            />
            <Button title="Enviar" onPress={handleSubmit}  />
        </View>
    );
}
/* Nombre Curso dni Faltas Materia Nota MateriaPrevia */


export default Formulario;

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
        borderRadius: 10,
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
    }

});

/*----------------------------------------------------------------------------------------------------------


function AlumnoAdd() {
    return (
        <View style={styles.container} >

            <label for="nombre" style={styles.label}>Nombre:</label>
            <input type="text" id="nombre" name="nombre" style={styles.input}></input>
            <label for="curso" style={styles.label}>Curso:</label>
            <input type="text" id="curso" name="curso" style={styles.input}></input>
            <label for="dni" style={styles.label}>DNI:</label>
            <input type="text" id="dni" name="dni" style={styles.input}></input>
            <label for="faltas" style={styles.label}>Faltas:</label>
            <input type="text" id="faltas" name="faltas" style={styles.input}></input>
            <h3 style={styles.label}>Materias y Notas</h3>
            <label for="materia1" style={styles.label}>Materia 1:</label>
            <input type="text" id="materia1" name="materia1" style={styles.input}></input>
            <label for="nota1" style={styles.label}>Nota 1:</label>
            <input type="number" id="nota1" name="nota1" style={styles.input}></input>

            <label for="materiaPrevia1" style={styles.label}>Materia Previa 1:</label>
            <input type="text" id="materiaPrevia1" name="materiaPrevia1" style={styles.input}></input>




        </View>


    );
}
export default AlumnoAdd



*/
