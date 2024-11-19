import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Componente funcional para eliminar un profesor
function EliminarP() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [profesorId, setProfesorId] = useState(null);
    const [formData, setFormData] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Buscar profesor en la base de datos por DNI
    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            showAlertModal("Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const profesorQuery = query(
                collection(db, 'profesores'),
                where("dni", "==", dniBusqueda)
            );
            const querySnapshot = await getDocs(profesorQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ningún profesor con ese DNI");
            } else {
                const profesorEncontrado = querySnapshot.docs[0];
                setProfesorId(profesorEncontrado.id);
                setFormData(profesorEncontrado.data());
                showAlertModal("Profesor encontrado. Puedes eliminarlo ahora.");
            }
        } catch (error) {
            console.error("Error al buscar el profesor: ", error);
            showAlertModal("Ocurrió un error al buscar el profesor");
        }
    };

    // Manejar la eliminación del profesor
    const eliminarProfesor = async () => {
        if (!profesorId) {
            showAlertModal("Primero busca un profesor por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'profesores', profesorId));
            showAlertModal("El profesor ha sido eliminado correctamente");
            setProfesorId(null);
            setFormData(null);
            setDniBusqueda('');
        } catch (error) {
            console.error("Error al eliminar el profesor: ", error);
            showAlertModal("No se pudo eliminar el profesor");
        }
    };

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>BUSCAR:</Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

            {formData && (
                <View style={styles.container}>
                    <Text style={styles.label}>Nombre: {formData.Nombre}</Text>
                    <Text style={styles.label}>Curso: {formData.Cursos}</Text>
                    <Text style={styles.label}>Materia: {formData.Materias}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Profesor"
                        onPress={eliminarProfesor}
                        color="red"
                    />
                </View>
            )}

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

export default EliminarP;

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
    /* Espacio entre los elementos */
    br: {
        height: 10,
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
