import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Componente funcional para agregar un nuevo curso
function CursoAdd() {
    const [formData, setFormData] = useState({
        NombreCurso: '',
        Turno: '',
        Horario: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        if (!formData.NombreCurso || !formData.Turno || !formData.Horario) {
            setModalMessage("Por favor complete todos los campos");
            setModalVisible(true);
            return;
        }

        try {
            const cursosRef = collection(db, 'cursos');
            const q = query(cursosRef, where("NombreCurso", "==", formData.NombreCurso));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setModalMessage("Ya existe un curso con este nombre.");
                setModalVisible(true);
                return;
            }

            await addDoc(cursosRef, {
                NombreCurso: formData.NombreCurso,
                Turno: formData.Turno,
                Horario: formData.Horario
            });

            setModalMessage("Curso agregado correctamente");
            setModalVisible(true);
            setFormData({ NombreCurso: '', Turno: '', Horario: '' });
        } catch (error) {
            console.error("Error al agregar el curso: ", error);
            setModalMessage("No se pudo agregar el curso");
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* Título del formulario */}
            <Text style={styles.title}>Agregar Curso</Text>

            {/* Campo para el nombre del curso */}
            <Text style={styles.label}>Nombre del Curso (incluya la división):</Text>
            <TextInput
                placeholder="Ingresar Nombre del Curso y División"
                value={formData.NombreCurso}
                onChangeText={(value) => handleChange('NombreCurso', value)}
                style={styles.input}
            />

            {/* Selector para el turno del curso */}
            <Text style={styles.label}>Turno:</Text>
            <Picker
                selectedValue={formData.Turno}
                onValueChange={(value) => handleChange('Turno', value)}
                style={styles.input}
            >
                <Picker.Item label="Seleccionar Turno" value="" />
                <Picker.Item label="Mañana" value="Mañana" />
                <Picker.Item label="Tarde" value="Tarde" />
                <Picker.Item label="Vespertino" value="Vespertino" />
            </Picker>

            {/* Campo para el horario del curso */}
            <Text style={styles.label}>Horario:</Text>
            <TextInput
                placeholder="Ingresar Horario"
                value={formData.Horario}
                onChangeText={(value) => handleChange('Horario', value)}
                style={styles.input}
            />

            <View style={styles.br} />
            {/* Botón para enviar el formulario */}
            <Button title="Enviar" onPress={handleSubmit} />

            {/* Modal para mostrar mensajes de alerta */}
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

export default CursoAdd;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        padding: 20,
    },
    /* Estilo para los campos de entrada de texto y selectores */
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
    /* Estilo para las etiquetas de los campos */
    label: {
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    /* Estilo para el título del formulario */
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    /* Espacio entre los elementos */
    br: {
        height: 20,
    },
    /* Estilos para el modal */
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
    /* Estilo del texto en el modal */
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
});
