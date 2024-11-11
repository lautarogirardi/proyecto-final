import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function EliminarCurso() {
    const [selectedCurso, setSelectedCurso] = useState('');
    const [cursos, setCursos] = useState([]);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const cursosCollection = collection(db, 'cursos');
                const cursosSnapshot = await getDocs(cursosCollection);
                const cursosList = cursosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })).filter(curso => curso.habilitado !== false);  // Excluir cursos deshabilitados
                setCursos(cursosList);
            } catch (error) {
                console.error("Error al obtener los cursos: ", error);
            }
        };
        fetchCursos();
    }, []);

    const handleCursoChange = (cursoId) => {
        setSelectedCurso(cursoId);
        const selectedCursoData = cursos.find(curso => curso.id === cursoId);
        setFormData(selectedCursoData || null);
    };

    const eliminarCurso = useCallback(async () => {
        if (!selectedCurso) {
            Alert.alert("Error", "Seleccione un curso");
            return;
        }

        try {
            await deleteDoc(doc(db, 'cursos', selectedCurso));
            Alert.alert("Curso eliminado", "El curso ha sido eliminado correctamente");
            setSelectedCurso('');
            setFormData(null);

            // Actualizar lista de cursos excluyendo el curso eliminado
            setCursos(prevCursos => prevCursos.filter(curso => curso.id !== selectedCurso));
        } catch (error) {
            console.error("Error al eliminar el curso: ", error);
            Alert.alert("Error", "No se pudo eliminar el curso");
        }
    }, [selectedCurso]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Curso:</Text>
            <Picker
                selectedValue={selectedCurso}
                onValueChange={handleCursoChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Curso" value="" />
                {cursos.map(curso => (
                    <Picker.Item key={curso.id} label={curso.NombreCurso} value={curso.id} />
                ))}
            </Picker>
            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Nombre del Curso: {formData.NombreCurso}</Text>
                    <Text style={styles.label}>Turno: {formData.Turno}</Text>
                    <Text style={styles.label}>Horario: {formData.Horario}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Curso"
                        onPress={eliminarCurso}
                        color="red"
                    />
                </View>
            )}
        </View>
    );
}

export default EliminarCurso;

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
        marginVertical: 5,
        color: '#000',
    },
    label: {
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    br: {
        height: 10,
    },
    resultContainer: {
        marginTop: 20,
    },
});
