import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function ActualizarCurso() {
    const [formData, setFormData] = useState({
        NombreCurso: '',
        Turno: '',
        Horario: ''
    });
    const [cursoId, setCursoId] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const cursosCollection = collection(db, 'cursos');
                const cursosSnapshot = await getDocs(cursosCollection);
                const cursosList = cursosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    NombreCurso: doc.data().NombreCurso || '',
                    Turno: doc.data().Turno || '',
                    Horario: doc.data().Horario || ''
                }));
                setCursos(cursosList);
            } catch (error) {
                console.error("Error al obtener los cursos: ", error);
            }
        };
        fetchCursos();
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value !== undefined ? value : ''
        });
    };

    const handleCursoChange = (cursoId) => {
        setSelectedCurso(cursoId);
        const selectedCursoData = cursos.find(curso => curso.id === cursoId);
        if (selectedCursoData) {
            setFormData({
                NombreCurso: selectedCursoData.NombreCurso,
                Turno: selectedCursoData.Turno,
                Horario: selectedCursoData.Horario
            });
            setCursoId(cursoId);
        }
    };

    const handleSubmit = async () => {
        if (!formData.NombreCurso || !formData.Turno || !formData.Horario) {
            setModalMessage("Por favor, complete todos los campos.");
            setModalVisible(true);
            return;
        }

        try {
            if (cursoId) {
                await updateDoc(doc(db, 'cursos', cursoId), formData);
                setModalMessage("Curso actualizado correctamente");
            } else {
                setModalMessage("Primero busca un curso");
            }
            setModalVisible(true);
        } catch (error) {
            console.error("Error al actualizar el curso: ", error);
            setModalMessage("No se pudo actualizar el curso");
            setModalVisible(true);
        }
    };

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

            <Text style={styles.label}>Nombre del Curso:</Text>
            <TextInput
                placeholder="Ingresar Nombre del Curso"
                value={formData.NombreCurso}
                onChangeText={(value) => handleChange('NombreCurso', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Turno:</Text>
            <Picker
                selectedValue={formData.Turno}
                onValueChange={(value) => handleChange('Turno', value)}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Turno" value="" />
                <Picker.Item label="Vespertino" value="vespertino" />
                <Picker.Item label="Tarde" value="tarde" />
                <Picker.Item label="Mañana" value="mañana" />
            </Picker>

            <Text style={styles.label}>Horario:</Text>
            <TextInput
                placeholder="Ingresar Horario"
                value={formData.Horario}
                onChangeText={(value) => handleChange('Horario', value)}
                style={styles.input}
            />

            <View style={styles.br} />
            <Button title="Guardar Cambios" onPress={handleSubmit} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <Button title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ActualizarCurso;

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
        color: '#000',
    },
    label: {
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    br: {
        height: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
});
