import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function Eliminar() {
    const [dniBusqueda, setDniBusqueda] = useState('');//inicializa estado dnibusqueda como vacio
    const [alumnoId, setAlumnoId] = useState(null);//inicializa estado alumnoid como null
    const [formData, setFormData] = useState(null); //inicializa estado formdata como null

    const buscarPorDni = async () => {
        if (!dniBusqueda) {//verifica si el campo dni esta vacio
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const alumnoQuery = query(//se crea una consulta
                collection(db, 'alumnos'),//se consulta a la coleccion alumnos
                where("dni", "==", dniBusqueda)//busca el dni ingresado en la coleccion
            );
            const querySnapshot = await getDocs(alumnoQuery);//se ejecuta la consulta

            if (querySnapshot.empty) {//validacion
                window.alert("No se encontró ningún alumno con ese DNI");
                Alert.alert("No encontrado", "No se encontró ningún alumno con ese DNI");
            } else {
                const alumnoEncontrado = querySnapshot.docs[0];//se guarda el id y los datos del alumno
                setAlumnoId(alumnoEncontrado.id);//guarda id
                setFormData(alumnoEncontrado.data());//guarda datos del alumno
                window.alert("Alumno Encontrado");
                Alert.alert("Alumno encontrado", "Puedes eliminarlo ahora");
            }
        } catch (error) {
            console.error("Error al buscar el alumno: ", error);
            window.alert("Ocurrió un error al buscar el alumno");
            Alert.alert("Error", "Ocurrió un error al buscar el alumno");
        }
    };

    const eliminarAlumno = async () => {
        if (!alumnoId) {//si no se encontro el alumno
            window.alert("Primero busca un alumno por DNI");
            Alert.alert("Error", "Primero busca un alumno por DNI");
            return;
        }

        try {
            await deleteDoc(doc(db, 'alumnos', alumnoId));//elimina el documento de la coleccion con el id
            window.alert("El alumno ha sido eliminado correctamente");
            Alert.alert("Alumno eliminado", "El alumno ha sido eliminado correctamente");
            setAlumnoId(null);//actualiza los estados
            setFormData(null);
            setDniBusqueda('');//limpia el campo de busqueda
        } catch (error) {
            console.error("Error al eliminar el alumno: ", error);
            window.alert("No se pudo eliminar el alumno");
            Alert.alert("Error", "No se pudo eliminar el alumno");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label} >BUSCAR: </Text>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}//valor del estado
                onChangeText={setDniBusqueda}//actualiza al valor ingresado por teclado
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />//ejecuta la funcion buscarpordni

            {formData && (//si se encuentra los datos del alumno
                <View style={styles.container}>
                    <Text style={styles.label}>Nombre: {formData.Nombre}</Text>//muestra nombre
                    <Text style={styles.label}>Curso: {formData.Curso}</Text>//mstrar dni
                    <View style={styles.br} />
                    <Button
                        title="Eliminar Alumno" onPress={eliminarAlumno} color="red" />//mostrar el boton para eliminar
                </View>
            )}
        </View>
    );
}

export default Eliminar;

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
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
    },
    label: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    br:{
        height:10,
    }
});
