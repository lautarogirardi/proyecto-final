import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Componente funcional para enlistar un preceptor
function PreceptorEnlistar() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Curso: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Reportes: ''
    });
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [preceptorId, setPreceptorId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Buscar preceptor en la base de datos por DNI
    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            showAlertModal("Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const preceptorQuery = query(collection(db, 'preceptores'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(preceptorQuery);

            if (querySnapshot.empty) {
                showAlertModal("No se encontró ningún preceptor con ese DNI");
            } else {
                const preceptorEncontrado = querySnapshot.docs[0];
                setPreceptorId(preceptorEncontrado.id);
                const data = preceptorEncontrado.data();

                setFormData({
                    Nombre: data.Nombre || '',
                    Curso: data.Curso || '',
                    dni: data.dni || '',
                    Faltas: data.Faltas || '',
                    Sanciones: data.Sanciones || '',
                    Reportes: data.Reportes || ''
                });
            }
        } catch (error) {
            console.error("Error al buscar el preceptor: ", error);
            showAlertModal("Ocurrió un error al buscar el preceptor");
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
            <Button title="Buscar" onPress={buscarPorDni} />
            <View style={styles.br}></View>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre Completo:</Text>
                    <TextInput
                        placeholder="Nombre Completo"
                        value={formData.Nombre}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Curso:</Text>
                    <TextInput
                        placeholder="Curso"
                        value={formData.Curso}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>DNI:</Text>
                    <TextInput
                        placeholder="DNI"
                        value={formData.dni}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Faltas:</Text>
                    <TextInput
                        placeholder="Faltas"
                        value={formData.Faltas}
                        style={styles.input}
                    />
                </View>
            </View>

            <Text style={styles.label}>Sanciones:</Text>
            <TextInput
                placeholder="Sanciones"
                value={formData.Sanciones}
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />

            <Text style={styles.label}>Reportes:</Text>
            <TextInput
                placeholder="Reportes"
                value={formData.Reportes}
                multiline
                numberOfLines={4}
                style={styles.textarea}
            />

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

export default PreceptorEnlistar;

/* Estilos para el componente */
const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
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
        textAlign: 'center',
    },
    /* Contenedor de entradas */
    inputContainer: {
        marginBottom: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    /* Estilo para las etiquetas */
    label: {
        fontFamily: 'arial',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    /* Espacio */
    br: {
        height: 10,
    },
    /* Estilo para los campos de texto grandes */
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
    /* Fila */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
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
