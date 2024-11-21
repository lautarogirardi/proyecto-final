import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Componente funcional para eliminar un profesor
function EliminarP() {
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [profesorId, setProfesorId] = useState('');
    const [formData, setFormData] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Cargar profesores desde la base de datos
    useEffect(() => {
        const fetchProfesores = async () => {
            try {
                const profesoresCollection = collection(db, 'profesores');
                const profesoresSnapshot = await getDocs(profesoresCollection);
                const profesoresList = profesoresSnapshot.docs.map(doc => ({
                    id: doc.id,
                    Nombre: doc.data().Nombre || '',
                    Apellido: doc.data().Apellido || '',
                    Cursos: doc.data().Cursos || '',
                    Materias: doc.data().Materias || '',
                    dni: doc.data().dni || '',
                }));
                setProfesores(profesoresList);
            } catch (error) {
                console.error("Error al obtener los profesores: ", error);
            }
        };
        fetchProfesores();
    }, []);

    // Manejar el cambio de selección del profesor
    const handleProfesorChange = (profesorId) => {
        setProfesorId(profesorId);
        const selectedProfesorData = profesores.find(profesor => profesor.id === profesorId);
        if (selectedProfesorData) {
            setFormData(selectedProfesorData);
        }
    };

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
            setProfesorId('');
            setFormData(null);
            setDniBusqueda('');
            setProfesores(profesores.filter(profesor => profesor.id !== profesorId));
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

    // Función para mostrar el modal de confirmación
    const showConfirmModal = () => {
        setConfirmModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Profesor:</Text>
            <Picker
                selectedValue={profesorId}
                onValueChange={handleProfesorChange}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un Profesor" value="" />
                {profesores.map(profesor => (
                    <Picker.Item key={profesor.id} label={`${profesor.Nombre} ${profesor.Apellido}`} value={profesor.id} />
                ))}
            </Picker>
            
            <Text style={styles.label}>O Buscar por DNI:</Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
                keyboardType="numeric"
            />
            <Button title="Buscar" onPress={buscarPorDni} />
            <View style={styles.br} />

            {formData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Nombre: {formData.Nombre}</Text>
                    <Text style={styles.label}>Cursos: {formData.Cursos}</Text>
                    <Text style={styles.label}>Materias: {formData.Materias}</Text>
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Profesor"
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
                        <Text style={styles.modalTitle}>¿Está seguro de que desea eliminar este profesor?</Text>
                        <Text style={styles.modalText}>¡Se perderá toda la información!</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setConfirmModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={() => { eliminarProfesor(); setConfirmModalVisible(false); }}>
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default EliminarP;

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
