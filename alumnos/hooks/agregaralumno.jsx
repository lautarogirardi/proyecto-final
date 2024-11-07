import React, { useState } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, Button } from 'react-native';
import { db } from '@/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function AlumnoAdd() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Reportes: ''
    });

    const [materias, setMaterias] = useState([{ materia: '', nota: '' }]);
    const [materiasPrevias, setMateriasPrevias] = useState([{ materiaPrevia: '', notaMateriaPrevia: '' }]);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const agregarMateria = () => {
        const lastMateria = materias[materias.length - 1];

        if (!lastMateria.materia || !lastMateria.nota) {
            Alert.alert("Error", "Complete todos los campos de la materia antes de agregar otra.");
            window.alert("Error: Complete todos los campos de la materia antes de agregar otra.");
            return;
        }

        const materiaExiste = materias.some((item, index) => item.materia === lastMateria.materia && index !== materias.length - 1) ||
            materiasPrevias.some(item => item.materiaPrevia === lastMateria.materia);

        if (materiaExiste) {
            Alert.alert("Error", "La materia no puede duplicarse ni coincidir con una materia previa.");
            window.alert("Error: La materia no puede duplicarse ni coincidir con una materia previa.");
            return;
        }

        setMaterias([...materias, { materia: '', nota: '' }]);
    };

    const agregarMateriaPrevia = () => {
        const lastMateriaPrevia = materiasPrevias[materiasPrevias.length - 1];

        if (!lastMateriaPrevia.materiaPrevia || !lastMateriaPrevia.notaMateriaPrevia) {
            Alert.alert("Error", "Complete todos los campos de la materia previa antes de agregar otra.");
            window.alert("Error: Complete todos los campos de la materia previa antes de agregar otra.");
            return;
        }

        const materiaPreviaExiste = materiasPrevias.some((item, index) => item.materiaPrevia === lastMateriaPrevia.materiaPrevia && index !== materiasPrevias.length - 1) ||
            materias.some(item => item.materia === lastMateriaPrevia.materiaPrevia);

        if (materiaPreviaExiste) {
            Alert.alert("Error", "La materia previa no puede duplicarse ni coincidir con una materia.");
            window.alert("Error: La materia previa no puede duplicarse ni coincidir con una materia.");
            return;
        }

        setMateriasPrevias([...materiasPrevias, { materiaPrevia: '', notaMateriaPrevia: '' }]);
    };

    const handleMateriaChange = (index, field, value) => {
        const newMaterias = [...materias];
        newMaterias[index][field] = value;
        setMaterias(newMaterias);
    };

    const handleMateriaPreviaChange = (index, field, value) => {
        const newMateriasPrevias = [...materiasPrevias];
        newMateriasPrevias[index][field] = value;
        setMateriasPrevias(newMateriasPrevias);
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Curso || !formData.dni || !formData.Faltas || !formData.Sanciones || !formData.Reportes) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Error: Por favor, complete todos los campos.");
            return;
        }

        try {
            const alumnosRef = collection(db, 'alumnos');
            const q = query(alumnosRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                Alert.alert("Error", "Ya existe un estudiante con este DNI.");
                window.alert("Error: Ya existe un estudiante con este DNI.");
                return;
            }

            await addDoc(alumnosRef, {
                ...formData,
                materias: materias.filter(item => item.materia && item.nota),
                materiasPrevias: materiasPrevias.filter(item => item.materiaPrevia && item.notaMateriaPrevia)
            });

            Alert.alert("Éxito", "Estudiante agregado correctamente");
            window.alert("Éxito: Estudiante agregado correctamente");

            setFormData({ Nombre: '', Curso: '', dni: '', Faltas: '', Sanciones: '', Reportes: '' });
            setMaterias([{ materia: '', nota: '' }]);
            setMateriasPrevias([{ materiaPrevia: '', notaMateriaPrevia: '' }]);

        } catch (error) {
            console.error("Error al agregar el usuario: ", error);
            Alert.alert("Error", "No se pudo agregar el usuario");
            window.alert("Error: No se pudo agregar el usuario");
        }
    };

    return (
        <View style={styles.container}>
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

            <Text style={styles.label}>Materias y Notas</Text>
            {materias.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <TextInput
                        placeholder="Ingresar Materia"
                        value={item.materia}
                        onChangeText={(value) => handleMateriaChange(index, 'materia', value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Ingresar Nota"
                        value={item.nota}
                        onChangeText={(value) => handleMateriaChange(index, 'nota', value)}
                        style={styles.input}
                    />
                </View>
            ))}
            <Button title="Agregar Materia" onPress={agregarMateria} />

            <Text style={styles.label}>Materias Previas</Text>
            {materiasPrevias.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <TextInput
                        placeholder="Ingresar Materia Previa"
                        value={item.materiaPrevia}
                        onChangeText={(value) => handleMateriaPreviaChange(index, 'materiaPrevia', value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Ingresar Nota"
                        value={item.notaMateriaPrevia}
                        onChangeText={(value) => handleMateriaPreviaChange(index, 'notaMateriaPrevia', value)}
                        style={styles.input}
                    />
                </View>
            ))}
            <Button title="Agregar Materia Previa" onPress={agregarMateriaPrevia} />

            <Text style={styles.label}>Sanciones:</Text>
            <TextInput
                placeholder="Ingresar Sanciones"
                value={formData.Sanciones}
                onChangeText={(value) => handleChange('Sanciones', value)}
                multiline={true}
                numberOfLines={4}
                style={styles.textarea}
            />

            <Text style={styles.label}>Reportes del Profesor:</Text>
            <TextInput
                placeholder="Ingresar Reportes"
                value={formData.Reportes}
                onChangeText={(value) => handleChange('Reportes', value)}
                multiline={true}
                numberOfLines={4}
                style={styles.textarea}
            />

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
        fontFamily: 'arial',
        marginVertical: 5,  
        color: '#000',
    },
});
