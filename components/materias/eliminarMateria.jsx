import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function Eliminar() {
    const [materiaId, setMateriaId] = useState('');
    const [formData, setFormData] = useState(null); 
    const [materias, setMaterias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const materiasCollection = collection(db, 'materias');
                const materiasSnapshot = await getDocs(materiasCollection);
                const materiasList = materiasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    materia: doc.data().materia || '',
                }));
                setMaterias(materiasList);
            } catch (error) {
                console.error("Error al obtener las materias: ", error);
            }
        };
        fetchMaterias();
    }, []);

    // Manejar el cambio de selección de la materia
    const handleMateriaChange = (materiaId) => {
        setMateriaId(materiaId);
        const selectedMateriaData = materias.find(materia => materia.id === materiaId);
        if (selectedMateriaData) {
            setFormData(selectedMateriaData);
        } else {
            setFormData(null);
        }
    };

    // Manejar la eliminación de la materia
    const eliminarMateria = async () => {
        if (!materiaId) {
            showAlertModal("Primero selecciona una materia");
            return;
        }

        try {
            await deleteDoc(doc(db, 'materias', materiaId));
            showAlertModal("La materia ha sido eliminada correctamente");
            setMateriaId('');
            setFormData(null);
            setMaterias(prevMaterias => prevMaterias.filter(materia => materia.id !== materiaId));
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

    // Función para mostrar el modal de confirmación
    const showConfirmModal = () => {
        setConfirmModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Materia:</Text>
            <Picker
                selectedValue={materiaId}
                onValueChange={handleMateriaChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione una Materia" value="" />
                {materias.map(materia => (
                    <Picker.Item key={materia.id} label={materia.materia} value={materia.id} />
                ))}
            </Picker>
            <View style={styles.br} />

            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Materia: {formData.materia}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Materia"
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
                        <Text style={styles.modalTitle}>¿Está seguro de que desea eliminar esta materia?</Text>
                        <Text style={styles.modalText}>¡Se perderá toda la información!</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setConfirmModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={() => { eliminarMateria(); setConfirmModalVisible(false); }}>
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Eliminar;

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
