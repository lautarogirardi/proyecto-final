import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

function Actualizar() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Reportes: '',
        Telefono: '',
        Email: '',
        Direccion: ''
    });
    const [materias, setMaterias] = useState([{ materia: '', nota: '' }]);
    const [materiasPrevias, setMateriasPrevias] = useState([{ materiaPrevia: '', notaMateriaPrevia: '' }]);
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
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

    const agregarMateria = () => {
        const lastMateria = materias[materias.length - 1];
        if (!lastMateria.materia || !lastMateria.nota) {
            Alert.alert("Error", "Completar materia y nota.");
            window.alert("Error: Completar materia y nota.");
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

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            return;
        }
    
        try {
            const estudianteQuery = query(collection(db, 'alumnos'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(estudianteQuery);
    
            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún estudiante con ese DNI");
                window.alert("No se encontró ningún estudiante con ese DNI");
            } else {
                const estudianteEncontrado = querySnapshot.docs[0];
                setEstudianteId(estudianteEncontrado.id);
                const data = estudianteEncontrado.data();
    
                setFormData({
                    Nombre: data.Nombre || '',
                    Curso: data.Curso || '',
                    dni: data.dni || '',
                    Faltas: data.Faltas || '',
                    Sanciones: data.Sanciones || '',
                    Reportes: data.Reportes || '',
                    Telefono: data.Telefono || '',
                    Email: data.Email || '',
                    Direccion: data.Direccion || ''
                });
                setMaterias(data.materias || [{ materia: '', nota: '' }]);
                setMateriasPrevias(data.materiasPrevias || [{ materiaPrevia: '', notaMateriaPrevia: '' }]);
            }
        } catch (error) {
            console.error("Error al buscar el estudiante: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el estudiante");
            window.alert("Error al buscar el estudiante");
        }
    };
    

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Curso || !formData.dni || !formData.Faltas || !formData.Sanciones || !formData.Reportes || !formData.Telefono || !formData.Email || !formData.Direccion) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const dniQuery = query(
                collection(db, 'alumnos'),
                where("dni", "==", formData.dni)
            );
            const dniSnapshot = await getDocs(dniQuery);

            if (!dniSnapshot.empty && dniSnapshot.docs[0].id !== estudianteId) {
                Alert.alert("Error", "El DNI ya está registrado con otro estudiante.");
                window.alert("Error: El DNI ya está registrado con otro estudiante.");
                return;
            }

            if (estudianteId) {
                await updateDoc(doc(db, 'alumnos', estudianteId), {
                    ...formData,
                    materias: materias.filter(item => item.materia && item.nota),
                    materiasPrevias: materiasPrevias.filter(item => item.materiaPrevia && item.notaMateriaPrevia)
                });
                Alert.alert("Éxito", "Estudiante actualizado correctamente");
                window.alert("Estudiante actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un estudiante por DNI");
                window.alert("Primero busca un estudiante por DNI");
            }
        } catch (error) {
            console.error("Error al actualizar el estudiante: ", error);
            Alert.alert("Error", "No se pudo actualizar el estudiante");
            window.alert("Error: No se pudo actualizar el estudiante");
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

            <Text style={styles.label}>Telefono:</Text>
            <TextInput
                placeholder="Ingresar Telefono"
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
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />

            <Text style={styles.label}>Reportes del Profesor:</Text>
            <TextInput
                placeholder="Ingresar Reportes"
                value={formData.Reportes}
                onChangeText={(value) => handleChange('Reportes', value)}
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />


            <Button title="Guardar Cambios" onPress={handleSubmit} />
        </View>
    );
}

export default Actualizar;

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

