import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';


function Actualizar() {
    const [formData, setFormData] = useState({
        materia: ''
    });
    const [materiaBusqueda, setMateriaBusqueda] = useState('');
    const [materiaId, setMateriaId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Manejar los cambios en el formulario
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Buscar materia en la base de datos
    const buscarPorMateria = async () => {
        if (!materiaBusqueda) {
            showAlertModal("Por favor, ingrese la materia para buscar");
            return;
        }

        try {
            const materiaQuery = query(collection(db, 'materias'), where("materia", "==", materiaBusqueda));
            const querySnapshot = await getDocs(materiaQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ninguna materia");
            } else {
                const materiaEncontrada = querySnapshot.docs[0];
                setMateriaId(materiaEncontrada.id);
                const data = materiaEncontrada.data();

                setFormData({
                    materia: data.materia || ''
                });
            }
        } catch (error) {
            console.error("Error al buscar la materia: ", error);
            showAlertModal("Ocurrió un error al buscar la materia");
        }
    };

    // Manejar la actualización de la materia
    const handleSubmit = async () => {
        if (!formData.materia) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            const materiaQuery = query(
                collection(db, 'materias'),
                where("materia", "==", formData.materia)
            );
            const materiaSnapshot = await getDocs(materiaQuery);

            if (!materiaSnapshot.empty && materiaSnapshot.docs[0].id !== materiaId) {
                showAlertModal("La materia ya está registrada.");
                return;
            }

            if (materiaId) {
                await updateDoc(doc(db, 'materias', materiaId), {
                    ...formData,
                });
                showAlertModal("Materia actualizada correctamente");
            } else {
                showAlertModal("Primero busca una materia");
            }
        } catch (error) {
            console.error("Error al actualizar la materia: ", error);
            showAlertModal("No se pudo actualizar la materia");
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
                placeholder="Buscar Materia"
                value={materiaBusqueda}
                onChangeText={setMateriaBusqueda}
                style={styles.input}
            />
            <Button title="Buscar" onPress={buscarPorMateria} />
            <View style={styles.br}></View>

            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.materia}
                onChangeText={(value) => handleChange('materia', value)}
                style={styles.input}
            />
            <Button title="Guardar Cambios" onPress={handleSubmit} color="green" />

            {/* Modal para mostrar mensajes de error o información */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
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

export default Actualizar;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    /* Separador */
    separator: {
        height: 3,
        backgroundColor: 'lightblue',  
        marginVertical: 10,       
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
    /* Estilo centrado para las etiquetas */
    labelcenter: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center', // Centra el texto
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
