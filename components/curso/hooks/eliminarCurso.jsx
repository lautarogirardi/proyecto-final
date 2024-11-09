import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function EliminarCurso() {
    const [codigoBusqueda, setCodigoBusqueda] = useState('');
    const [cursoId, setCursoId] = useState(null);
    const [formData, setFormData] = useState(null);

    const buscarPorCodigo = useCallback(async () => {
        if (!codigoBusqueda) {
            Alert.alert("Error", "Por favor, ingrese un código de curso para buscar");
            return;
        }

        try {
            const cursoQuery = query(collection(db, 'cursos'), where("CodigoCurso", "==", codigoBusqueda));
            const querySnapshot = await getDocs(cursoQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún curso con ese código");
            } else {
                const cursoEncontrado = querySnapshot.docs[0];
                setCursoId(cursoEncontrado.id);
                setFormData(cursoEncontrado.data());
                Alert.alert("Curso encontrado", "Puedes eliminarlo ahora");
            }
        } catch (error) {
            console.error("Error al buscar el curso: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el curso");
        }
    }, [codigoBusqueda]);

    const eliminarCurso = useCallback(async () => {
        if (!cursoId) {
            Alert.alert("Error", "Primero busca un curso por su código");
            return;
        }

        try {
            await deleteDoc(doc(db, 'cursos', cursoId));
            Alert.alert("Curso eliminado", "El curso ha sido eliminado correctamente");
            setCursoId(null);
            setFormData(null);
            setCodigoBusqueda('');
        } catch (error) {
            console.error("Error al eliminar el curso: ", error);
            Alert.alert("Error", "No se pudo eliminar el curso");
        }
    }, [cursoId]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>BUSCAR:</Text>
            <TextInput
                placeholder="Buscar por Código de Curso"
                value={codigoBusqueda}
                onChangeText={setCodigoBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorCodigo} />

            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Nombre del Curso: {formData.NombreCurso}</Text>
                    <Text style={styles.label}>Código del Curso: {formData.CodigoCurso}</Text>
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
