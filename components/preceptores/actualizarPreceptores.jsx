import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Componente funcional para actualizar información de un preceptor
function ActualizarPreceptor() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Telefono: '',
        Email: '',
        Direccion: ''
    });
    const [preceptorId, setPreceptorId] = useState(null);
    const [preceptores, setPreceptores] = useState([]);
    const [selectedPreceptor, setSelectedPreceptor] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Obtener lista de preceptores al cargar el componente
    useEffect(() => {
        const fetchPreceptores = async () => {
            try {
                const preceptoresCollection = collection(db, 'preceptores');
                const preceptoresSnapshot = await getDocs(preceptoresCollection);
                const preceptoresList = preceptoresSnapshot.docs.map(doc => ({
                    id: doc.id,
                    Nombre: doc.data().Nombre || '',
                    Telefono: doc.data().Telefono || '',
                    Email: doc.data().Email || '',
                    Direccion: doc.data().Direccion || ''
                }));
                setPreceptores(preceptoresList);
            } catch (error) {
                console.error("Error al obtener los preceptores: ", error);
            }
        };
        fetchPreceptores();
    }, []);

    // Manejar los cambios en el formulario
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value !== undefined ? value : ''
        });
    };

    // Manejar la selección del preceptor
    const handlePreceptorChange = (preceptorId) => {
        setSelectedPreceptor(preceptorId);
        const selectedPreceptorData = preceptores.find(preceptor => preceptor.id === preceptorId);
        if (selectedPreceptorData) {
            setFormData({
                Nombre: selectedPreceptorData.Nombre,
                Telefono: selectedPreceptorData.Telefono,
                Email: selectedPreceptorData.Email,
                Direccion: selectedPreceptorData.Direccion
            });
            setPreceptorId(preceptorId);
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Telefono || !formData.Email || !formData.Direccion) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            if (preceptorId) {
                await updateDoc(doc(db, 'preceptores', preceptorId), formData);
                showAlertModal("Preceptor actualizado correctamente");
            } else {
                showAlertModal("Primero busca un preceptor");
            }
        } catch (error) {
            console.error("Error al actualizar el preceptor: ", error);
            showAlertModal("No se pudo actualizar el preceptor");
        }
    };

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Preceptor:</Text>
            <Picker
                selectedValue={selectedPreceptor}
                onValueChange={handlePreceptorChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Preceptor" value="" />
                {preceptores.map(preceptor => (
                    <Picker.Item key={preceptor.id} label={preceptor.Nombre} value={preceptor.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Nombre Completo:</Text>
            <TextInput
                placeholder="Ingresar Nombre Completo"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}
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

            <View style={styles.br} />
            <Button title="Guardar Cambios" onPress={handleSubmit} />

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

export default ActualizarPreceptor;

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
