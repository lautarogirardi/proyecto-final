import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function Actualizar() {
    const [formData, setFormData] = useState({
        materia: ''
    });
    const [materiaId, setMateriaId] = useState('');
    const [materias, setMaterias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
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
        }
    };

    // Manejar la actualización de la materia
    const handleSubmit = async () => {
        if (!formData.materia) {
            showAlertModal("Por favor, complete todos los campos.");
            return;
        }

        try {
            if (materiaId) {
                await updateDoc(doc(db, 'materias', materiaId), {
                    ...formData,
                });
                showAlertModal("Materia actualizada correctamente");
            } else {
                showAlertModal("Primero selecciona una materia");
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
            <View style={styles.br}></View>

            <Text style={styles.label}>Materia:</Text>
            <TextInput
                placeholder="Ingresar Materia"
                value={formData.materia}
                onChangeText={(value) => setFormData({ ...formData, materia: value })}
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
        textAlign: 'center',
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
