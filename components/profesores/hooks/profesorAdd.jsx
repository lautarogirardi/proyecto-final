import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text, Modal } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

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

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Apellido || !formData.dni || !formData.Telefono || !formData.Email) {
            setModalMessage("Por favor, complete todos los campos.");
            setModalVisible(true);
            return;
        }

        try {
            const profesoresRef = collection(db, 'profesores');
            const q = query(profesoresRef, where("dni", "==", formData.dni));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setModalMessage("Ya existe un profesor con este DNI.");
                setModalVisible(true);
                return;
            }

            await addDoc(profesoresRef, {
                Nombre: formData.Nombre,
                Apellido: formData.Apellido,  // Guardar apellido
                dni: formData.dni,
                Telefono: formData.Telefono,
                Email: formData.Email
            });

            setModalMessage("Profesor agregado correctamente");
            setModalVisible(true);
            setFormData({ Nombre: '', Apellido: '', dni: '', Telefono: '', Email: '' });
        } catch (error) {
            console.error("Error al agregar el profesor: ", error);
            setModalMessage("No se pudo agregar el profesor");
            setModalVisible(true);
        }
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
                style={styles.input}
            />

            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
                placeholder="Ingresar Teléfono"
                value={formData.Telefono}
                onChangeText={(value) => handleChange('Telefono', value)}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Ingresar Email"
                value={formData.Email}
                onChangeText={(value) => handleChange('Email', value)}
                style={styles.input}
            />

            <View style={styles.br} />
            <Button title="Enviar" onPress={handleSubmit} />

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

export default ProfesorAdd;

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
