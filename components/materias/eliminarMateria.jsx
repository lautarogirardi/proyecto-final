import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';


function Eliminar() {
    const [materiaBusqueda, setMateriaBusqueda] = useState('');
    const [materiaId, setMateriaId] = useState(null);
    const [formData, setFormData] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Buscar materia en la base de datos
    const buscarPorMateria = async () => {
        if (!materiaBusqueda) {
            showAlertModal("Por favor, ingrese una materia para buscar");
            return;
        }

        try {
            const materiaQuery = query(
                collection(db, 'materias'),
                where("materia", "==", materiaBusqueda)
            );
            const querySnapshot = await getDocs(materiaQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ninguna materia con ese nombre");
            } else {
                const materiaEncontrado = querySnapshot.docs[0];
                setMateriaId(materiaEncontrado.id);
                setFormData(materiaEncontrado.data());
                showAlertModal("Materia encontrada. Puedes eliminarla ahora.");
            }
        } catch (error) {
            console.error("Error al buscar la materia: ", error);
            showAlertModal("Ocurrió un error al buscar la materia");
        }
    };

    // Manejar la eliminación de la materia
    const eliminarMateria = async () => {
        if (!materiaId) {
            showAlertModal("Primero busca una materia");
            return;
        }

        try {
            await deleteDoc(doc(db, 'materias', materiaId));
            showAlertModal("La materia ha sido eliminada correctamente");
            setMateriaId(null);
            setFormData(null);
            setMateriaBusqueda('');
        } catch (error) {
            console.error("Error al eliminar la materia: ", error);
            showAlertModal("No se pudo eliminar la materia");
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
                placeholder="Buscar materia"
                value={materiaBusqueda}
                onChangeText={setMateriaBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorMateria} />

            {formData && (
                <View style={styles.container}>
                    <Text style={styles.label}>Materia: {formData.materia}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Materia"
                        onPress={eliminarMateria}
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
