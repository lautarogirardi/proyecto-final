import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Componente funcional para eliminar un estudiante
function Eliminar() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Función para mostrar un mensaje en un modal
    const showAlertModal = (message) => {
        setAlertMessage(message);
        setAlertModalVisible(true);
    };

    // Función para buscar un estudiante por DNI
    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            showAlertModal("Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const estudianteQuery = query(
                collection(db, 'alumnos'),
                where("dni", "==", dniBusqueda)
            );
            const querySnapshot = await getDocs(estudianteQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ningún estudiante con ese DNI");
            } else {
                const estudianteEncontrado = querySnapshot.docs[0];
                setEstudianteId(estudianteEncontrado.id);
                setFormData(estudianteEncontrado.data());
                showAlertModal("Estudiante encontrado, puedes eliminarlo ahora");
            }
        } catch (error) {
            console.error("Error al buscar el estudiante: ", error);
            showAlertModal("Ocurrió un error al buscar el estudiante");
        }
    };

    // Función para confirmar la eliminación del estudiante
    const confirmarEliminarEstudiante = () => {
        setModalVisible(true); // Mostrar el modal de confirmación
    };

    // Función para eliminar un estudiante
    const eliminarEstudiante = async () => {
        if (!estudianteId) {
            showAlertModal("Primero busca un estudiante por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'alumnos', estudianteId));
            showAlertModal("El estudiante ha sido eliminado correctamente");
            setEstudianteId(null);
            setFormData(null);
            setDniBusqueda('');
            setModalVisible(false); // Cerrar el modal de confirmación
        } catch (error) {
            console.error("Error al eliminar el estudiante: ", error);
            showAlertModal("No se pudo eliminar el estudiante");
        }
    };

    return (
        <View style={styles.container}>
            {/* Campo para buscar estudiante por DNI */}
            <Text style={styles.label}>BUSCAR: </Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

            {/* Mostrar información del estudiante y el botón para eliminar */}
            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Nombre: {formData.Nombre}</Text>
                    <Text style={styles.label}>Curso: {formData.Curso}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Estudiante"
                        onPress={confirmarEliminarEstudiante}
                        color="red"
                    />
                </View>
            )}

            {/* Modal para confirmar la eliminación */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>¿Está seguro de que desea eliminar este estudiante?</Text>
                        <Text style={styles.modalText}>¡Se perderá toda la información!</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={() => {
                                    setModalVisible(false);
                                    eliminarEstudiante();
                                }}
                            >
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal para mostrar mensajes de alerta */}
            <Modal
                visible={alertModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setAlertModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{alertMessage}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setAlertModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Eliminar;

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
    /* Estilo para las etiquetas de los campos */
    label: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    /* Espacio entre los campos */
    br: {
        height: 10,
    },
    /* Contenedor para el resultado de la búsqueda */
    resultContainer: {
        marginTop: 20,
    },
    /* Estilos para el modal */
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: 'grey',
    },
    buttonDelete: {
        backgroundColor: 'red',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
