import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Componente funcional para agregar un nuevo preceptor
function PreceptorAdd() {
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion: ''
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
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            const preceptoresRef = collection(db, 'preceptores');
            const q = query(preceptoresRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                showAlertModal("Ya existe un preceptor con este DNI.");
                return;
            }

            await addDoc(preceptoresRef, formData);
            showAlertModal("Preceptor agregado correctamente");
            setFormData({ Nombre: '', dni: '', Telefono: '', Email: '', Direccion: '' });
        } catch (error) {
            console.error("Error al agregar el preceptor: ", error);
            showAlertModal("No se pudo agregar el preceptor");
        }
    };

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
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

            <Text style={styles.label}>Dirección:</Text>
            <TextInput
                placeholder="Ingresar Dirección"
                value={formData.Direccion}
                onChangeText={(value) => handleChange('Direccion', value)}
                style={styles.input}
            />
            <View style={styles.br}></View>
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

export default PreceptorAdd;

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
    /* Textarea */
    textarea: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginVertical: 5,  
        color: '#000',
    },
    /* Espacio */
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
