import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Componente funcional para eliminar un preceptor
function EliminarPreceptor() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [preceptorId, setPreceptorId] = useState('');
    const [formData, setFormData] = useState(null);
    const [preceptores, setPreceptores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Cargar preceptores desde la base de datos
    useEffect(() => {
        const fetchPreceptores = async () => {
            try {
                const preceptoresCollection = collection(db, 'preceptores');
                const preceptoresSnapshot = await getDocs(preceptoresCollection);
                const preceptoresList = preceptoresSnapshot.docs.map(doc => ({
                    id: doc.id,
                    Nombre: doc.data().Nombre || '',
                    Apellido: doc.data().Apellido || '',
                    dni: doc.data().dni || '',
                }));
                setPreceptores(preceptoresList);
            } catch (error) {
                console.error("Error al obtener los preceptores: ", error);
            }
        };
        fetchPreceptores();
    }, []);

    // Manejar el cambio de selección del preceptor
    const handlePreceptorChange = (preceptorId) => {
        setPreceptorId(preceptorId);
        const selectedPreceptorData = preceptores.find(preceptor => preceptor.id === preceptorId);
        if (selectedPreceptorData) {
            setFormData(selectedPreceptorData);
        }
    };

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
            showAlertModal("Primero busca un preceptor");
            return;
        }

        try {
            await deleteDoc(doc(db, 'preceptores', preceptorId));
            showAlertModal("El preceptor ha sido eliminado correctamente");
            setPreceptorId('');
            setFormData(null);
            setPreceptores(preceptores.filter(preceptor => preceptor.id !== preceptorId));
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

    // Función para mostrar el modal de confirmación
    const showConfirmModal = () => {
        setConfirmModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Preceptor:</Text>
            <Picker
                selectedValue={preceptorId}
                onValueChange={handlePreceptorChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Preceptor" value="" />
                {preceptores.map(preceptor => (
                    <Picker.Item key={preceptor.id} label={`${preceptor.Nombre} ${preceptor.Apellido}`} value={preceptor.id} />
                ))}
            </Picker>
            
            <Text style={styles.label}>O Buscar por DNI:</Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <Button title="Buscar" onPress={buscarPorDni} />
            <View style={styles.br} />

            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Nombre: {formData.Nombre || 'No disponible'}</Text>
                    <Text style={styles.label}>DNI: {formData.dni || 'No disponible'}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Preceptor"
                        onPress={showConfirmModal}
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
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <Button title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>

            {/* Modal para confirmación de eliminación */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(!confirmModalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>¿Está seguro de que desea eliminar este preceptor?</Text>
                        <Text style={styles.modalText}>¡Se perderá toda la información!</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setConfirmModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={() => { eliminarPreceptor(); setConfirmModalVisible(false); }}>
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default EliminarPreceptor;

/* Estilos para el componente */
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
        height: 10,
    },
    resultContainer: {
        marginTop: 20,
    },
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
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
