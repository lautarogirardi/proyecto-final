import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text, Modal, Picker } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function CursoAdd() {
    const [formData, setFormData] = useState({
        NombreCurso: '',
        Turno: '',
        Profesores: '',
        Horario: ''
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
        if (!formData.NombreCurso || !formData.Turno || !formData.Profesores || !formData.Horario) {
            setModalMessage("Por favor, complete todos los campos.");
            setModalVisible(true);
            return;
        }

        try {
            const cursosRef = collection(db, 'cursos');
            const q = query(cursosRef, where("NombreCurso", "==", formData.NombreCurso));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setModalMessage("Ya existe un curso con esta combinación de curso y división.");
                setModalVisible(true);
                return;
            }

            await addDoc(cursosRef, {
                NombreCurso: formData.NombreCurso,
                Turno: formData.Turno,
                Profesores: formData.Profesores,
                Horario: formData.Horario
            });

            setModalMessage("Curso agregado correctamente");
            setModalVisible(true);
            setFormData({ NombreCurso: '', Turno: '', Profesores: '', Horario: '' });
        } catch (error) {
            console.error("Error al agregar el curso: ", error);
            setModalMessage("No se pudo agregar el curso");
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Curso</Text>
            <Text style={styles.label}>Nombre del Curso (incluya la división):</Text>
            <TextInput
                placeholder="Ingresar Nombre del Curso y División"
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
                <Picker.Item label="Seleccionar Turno" value="" />
                <Picker.Item label="Mañana" value="Mañana" />
                <Picker.Item label="Tarde" value="Tarde" />
                <Picker.Item label="Vespertino" value="Vespertino" />
            </Picker>

            <Text style={styles.label}>Profesores:</Text>
            <TextInput
                placeholder="Ingresar Profesores"
                value={formData.Profesores}
                onChangeText={(value) => handleChange('Profesores', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Horario:</Text>
            <TextInput
                placeholder="Ingresar Horario"
                value={formData.Horario}
                onChangeText={(value) => handleChange('Horario', value)}
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

export default CursoAdd;

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
