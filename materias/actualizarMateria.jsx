import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
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
    const [listaMaterias, setListaMaterias] = useState([]);

    useEffect(() => {
        // Cargar materias de Firestore al montar el componente
        const cargarMaterias = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'materias'));
                const materiasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListaMaterias(materiasData);
            } catch (error) {
                console.error("Error al obtener materias: ", error);
            }
        };
        cargarMaterias();
    }, []);

    const handleMateriaChange = (index, field, value) => {
        const newMaterias = [...materias];
        newMaterias[index][field] = value;
        setMaterias(newMaterias);
    };

    const agregarMateria = () => {
        const lastMateria = materias[materias.length - 1];
        if (!lastMateria.materia || !lastMateria.nota) {
            Alert.alert("Error", "Completar materia y nota.");
            return;
        }
        setMaterias([...materias, { materia: '', nota: '' }]);
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

            <Text style={styles.label}>Materias y Notas</Text>
            {materias.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.label}>Materia:</Text>
                    <Picker
                        selectedValue={item.materia}
                        onValueChange={(value) => handleMateriaChange(index, 'materia', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccionar Materia" value="" />
                        {listaMaterias.map((materia) => (
                            <Picker.Item key={materia.id} label={materia.materia} value={materia.materia} />
                        ))}
                    </Picker>
                    <TextInput
                        placeholder="Ingresar Nota"
                        value={item.nota}
                        onChangeText={(value) => handleMateriaChange(index, 'nota', value)}
                        style={styles.input}
                    />
                </View>
            ))}
            <Button title="Agregar Materia" onPress={agregarMateria} />

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
        marginVertical: 5,
        color: '#000',
    },
    label: {
        marginVertical: 5,
        fontWeight: 'bold',
    },
});
