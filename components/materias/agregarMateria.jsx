import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Componente funcional para agregar una nueva materia
function AgregarMateria() {
    const [formData, setFormData] = useState({
        materia: '',
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Manejar cambios en el formulario
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async () => {
        if (!formData.materia) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            const materiaRef = collection(db, 'materias');
            const q = query(materiaRef, where("materia", "==", formData.materia));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                showAlertModal("Ya existe esa materia.");
                return;
            }

            await addDoc(materiaRef, formData);
            showAlertModal("Materia agregada correctamente");
            setFormData({ materia: '' });
        } catch (error) {
            console.error("Error al agregar materia: ", error);
            showAlertModal("No se pudo agregar la materia");
        }
    };

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.materia}
                onChangeText={(value) => handleChange('materia', value)}
                style={styles.input}
            />
            <Button title="Enviar" onPress={handleSubmit} />

            {/* Modal para mostrar mensajes de error o información */}
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

export default AgregarMateria;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    /* Estilo para los campos de entrada de texto */
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
    /* Estilo para las etiquetas */
    label: {
        marginVertical: 5,
        fontWeight: 'bold',
    },
    /* Contenedor del modal */
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    /* Estilo de la vista del modal */
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    /* Estilo del texto en el modal */
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
