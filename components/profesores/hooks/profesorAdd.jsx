import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Componente funcional para agregar un nuevo profesor
function ProfesorAdd() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        dni: '',
        Telefono: '',
        Email: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    // Manejar cambios en el formulario
    const handleChange = (name, value) => {
        if ((name === 'dni' || name === 'Telefono') && !/^\d*$/.test(value)) {
            showErrorModal(`Solo se pueden ingresar números en  ${name}`);
            return; // Permitir solo números
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Apellido || !formData.dni || !formData.Telefono || !formData.Email) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            const profesoresRef = collection(db, 'profesores');
            const q = query(profesoresRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                showAlertModal("Ya existe un profesor con este DNI.");
                return;
            }

            await addDoc(profesoresRef, formData);

            showAlertModal("Profesor agregado correctamente");
            setFormData({ Nombre: '', Apellido: '', dni: '', Telefono: '', Email: '' });
        } catch (error) {
            console.error("Error al agregar el profesor: ", error);
            showAlertModal("No se pudo agregar el profesor");
        }
    };

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    // Función para mostrar un mensaje de error en un modal
    const showErrorModal = (message) => {
        setErrorModalMessage(message);
        setErrorModalVisible(true);
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

            <Text style={styles.label}>Apellido:</Text>
            <TextInput
                placeholder="Ingresar Apellido"
                value={formData.Apellido}
                onChangeText={(value) => handleChange('Apellido', value)}
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

            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
                placeholder="Ingresar Teléfono"
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

            <View style={styles.br} />
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

            {/* Modal para mostrar mensajes de error en DNI y Teléfono */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(!errorModalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{errorModalMessage}</Text>
                        <Button title="Cerrar" onPress={() => setErrorModalVisible(!errorModalVisible)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ProfesorAdd;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
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
        color: '#000',
        fontWeight: 'bold',
    },
    /* Espacio entre los elementos */
    br: {
        height: 20,
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
