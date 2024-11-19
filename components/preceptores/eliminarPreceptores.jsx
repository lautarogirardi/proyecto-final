import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Componente funcional para eliminar un preceptor
function EliminarPreceptor() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [preceptorId, setPreceptorId] = useState(null);
    const [formData, setFormData] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Buscar preceptor en la base de datos por DNI
    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            showAlertModal("Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const preceptorQuery = query(
                collection(db, 'preceptores'),
                where("dni", "==", dniBusqueda)
            );
            const querySnapshot = await getDocs(preceptorQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ningún preceptor con ese DNI");
            } else {
                const preceptorEncontrado = querySnapshot.docs[0];
                setPreceptorId(preceptorEncontrado.id);
                setFormData(preceptorEncontrado.data());
                showAlertModal("Preceptor encontrado. Puedes eliminarlo ahora.");
            }
        } catch (error) {
            console.error("Error al buscar el preceptor: ", error);
            showAlertModal("Ocurrió un error al buscar el preceptor");
        }
    };

    // Manejar la eliminación del preceptor
    const eliminarPreceptor = async () => {
        if (!preceptorId) {
            showAlertModal("Primero busca un preceptor por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'preceptores', preceptorId));
            showAlertModal("El preceptor ha sido eliminado correctamente");
            setPreceptorId(null);
            setFormData(null);
            setDniBusqueda('');
        } catch (error) {
            console.error("Error al eliminar el preceptor: ", error);
            showAlertModal("No se pudo eliminar el preceptor");
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
                    <Text style={styles.label}>Curso: {formData.Curso}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Preceptor"
                        onPress={eliminarPreceptor}
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

export default EliminarPreceptor;

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
