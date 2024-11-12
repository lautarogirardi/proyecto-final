import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value !== undefined ? value : ''
        });
    };

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

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.Telefono || !formData.Email || !formData.Direccion) {
            setModalMessage("Por favor, complete todos los campos.");
            setModalVisible(true);
            return;
        }

        try {
            if (preceptorId) {
                await updateDoc(doc(db, 'preceptores', preceptorId), formData);
                setModalMessage("Preceptor actualizado correctamente");
            } else {
                setModalMessage("Primero busca un preceptor");
            }
            setModalVisible(true);
        } catch (error) {
            console.error("Error al actualizar el preceptor: ", error);
            setModalMessage("No se pudo actualizar el preceptor");
            setModalVisible(true);
        }
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
