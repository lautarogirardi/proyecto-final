import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

// Componente funcional para actualizar información de un profesor
function ActualizarP() {
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion: '',
        Faltas: '',
        Materias: '',
        Cursos: '',
        Puntuacion: '',
        Reportes: ''
    });
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [profesorId, setProfesorId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Manejar cambios en el formulario
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Buscar profesor en la base de datos por DNI
    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            showAlertModal("Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const profesorQuery = query(collection(db, 'profesores'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(profesorQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ningún profesor con ese DNI");
            } else {
                const profesorEncontrado = querySnapshot.docs[0];
                setProfesorId(profesorEncontrado.id);
                setFormData(profesorEncontrado.data());
            }
        } catch (error) {
            console.error("Error al buscar el profesor: ", error);
            showAlertModal("Ocurrió un error al buscar el profesor");
        }
    };

    // Manejar la actualización del profesor
    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion || !formData.Faltas || !formData.Materias || !formData.Cursos || !formData.Puntuacion) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            if (profesorId) {
                await updateDoc(doc(db, 'profesores', profesorId), formData);
                showAlertModal("Profesor actualizado correctamente");
            } else {
                showAlertModal("Primero busca un profesor por DNI");
            }
        } catch (error) {
            console.error("Error al actualizar el profesor: ", error);
            showAlertModal("No se pudo actualizar el profesor");
        }
    };

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

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

            <Text style={styles.label}>Dirección:</Text>
            <TextInput
                placeholder="Ingresar Dirección"
                value={formData.Direccion}
                onChangeText={(value) => handleChange('Direccion', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Faltas:</Text>
            <TextInput
                placeholder="Ingresar Faltas"
                value={formData.Faltas}
                onChangeText={(value) => handleChange('Faltas', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Materias Asignadas:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.Materias}
                onChangeText={(value) => handleChange('Materias', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Curso:</Text>
            <TextInput
                placeholder="Ingresar Curso"
                value={formData.Cursos}
                onChangeText={(value) => handleChange('Cursos', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Comportamiento:</Text>
            <TextInput
                placeholder="Ingresar Puntuación"
                value={formData.Puntuacion}
                onChangeText={(value) => handleChange('Puntuacion', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Reportes:</Text>
            <TextInput
                placeholder="Ingresar Reportes"
                value={formData.Reportes}
                onChangeText={(value) => handleChange('Reportes', value)}
                multiline
                numberOfLines={15}
                textAlignVertical="top"
                style={styles.textarea}
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
        </View>
    );
}

export default ActualizarP;

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
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
    },
    /* Estilo para las etiquetas */
    label: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    /* Espacio */
    br: {
        height: 20,
    },
    /* Textarea */
    textarea: {
        padding: 5,
        width: '100%',
        borderRadius: 15,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
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
