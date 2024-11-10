import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

function ActualizarP() {
    
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Telefono: '',
        Email: '',
        Direccion:'',
        Faltas:'',
        Puntuacion: ''
    });
    const [Reportes, setReportes] = useState([{ Reporte: '' }]);
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [profesorId, setProfesorId] = useState(null);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleReporteChange = (index, field, value) => {
        if (index >= 0 && index < Reportes.length) {
            const newReportes = [...Reportes];
            newReportes[index][field] = value;
            setReportes(newReportes);
        }
    };

    const agregarReporte = () => {
        const lastReportes = Reportes[Reportes.length - 1];
        if (!lastReportes.Reporte) {
            Alert.alert("Error", "Completar el reporte.");
            return;
        }
        setReportes([...Reportes, { Reporte: '' }]);

    };

    const buscarPorDni = async () => {
        if (!dniBusqueda) {
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const profesorQuery = query(collection(db, 'profesores'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(profesorQuery);

            if (querySnapshot.empty) {
                window.alert("No se encontró ningún profesor con ese DNI");
                Alert.alert("No encontrado", "No se encontró ningún profesor con ese DNI");
            } else {
                const profesorEncontrado = querySnapshot.docs[0];
                setProfesorId(profesorEncontrado.id);
                setFormData(profesorEncontrado.data());
                const data = profesorEncontrado.data();
    
                setFormData({
                    Nombre: data.Nombre || '',
                    dni: data.dni || '',
                    Telefono: data.Telefono || '',
                    Email: data.Email || '',
                    Direccion: data.Direccion || '',
                    Faltas: data.Faltas || '',
                    Puntuacion: data.Puntuacion || ''
                });
                setReportes(data.Reportes && data.Reportes.length > 0
                    ? data.Reportes
                    : [{ Reporte: '' }]);
            }
        } catch (error) {
            console.error("Error al buscar el profesor: ", error);
            window.alert("Error", "Ocurrió un error al buscar el profesor");
            Alert.alert("Error", "Ocurrió un error al buscar el profesor");
        }
    };

    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.dni || !formData.Telefono || !formData.Email || !formData.Direccion || !formData.Faltas || !formData.Puntuacion  ) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Error: Por favor, complete todos los campos.");
            return;
        }

        try {            const dniQuery = query(
            collection(db, 'profesores'),
            where("dni", "==", formData.dni)
        );
        const dniSnapshot = await getDocs(dniQuery);
        
        if (!dniSnapshot.empty && dniSnapshot.docs[0].id !== profesorId) {
            Alert.alert("Error", "El DNI ya está registrado con otro profesor.");
            window.alert("Error: El DNI ya está registrado con otro profesor.");
            return;
        }

        if (profesorId) {
            await updateDoc(doc(db, 'profesores', profesorId), {
                ...formData,
                Reportes: Reportes.filter(item => item.Reporte),
            });
            Alert.alert("Éxito", "Profesor actualizado correctamente");
            window.alert("Profesor actualizado correctamente");
        } else {
            Alert.alert("Error", "Primero busca un profesor por DNI");
            window.alert("Primero busca un profesor por DNI");
        }
        } catch (error) {
            console.error("Error al actualizar el profesor: ", error);
            window.alert("Error: No se pudo actualizar el profesor");
            Alert.alert("Error", "No se pudo actualizar el profesor");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}
                style={styles.input}
            />
            <View style={styles.br} />
            <Button title="Buscar" onPress={buscarPorDni} />

            <Text style={styles.label}>Nombre Completo:</Text>
            <TextInput
                placeholder="Ingresar Nombre Completo"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}
                style={styles.input}
            />

            <Text style={styles.label}>DNI:</Text>
            <TextInput
                placeholder="Ingresar DNI"
                value={formData.dni}
                onChangeText={(value) => handleChange('dni', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Telefono:</Text>
            <TextInput
                placeholder="Ingresar Telefono"
                value={formData.Telefono}
                onChangeText={(value) => handleChange('Telefono', value)}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Ingresar Email"
                value={formData.Email}
                onChangeText={(value) => handleChange('Email', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Direccion:</Text>

            <TextInput
                placeholder="Ingresar Direccion"
                value={formData.Direccion}
                onChangeText={(value) => handleChange('Direccion', value)}
                style={styles.input}
            />

            <Text style={styles.label}>Faltas:</Text>
            <TextInput
                placeholder="Ingresar Faltas"
                value={formData.Faltas}
                onChangeText={(value) => handleChange('Faltas', value)}
                style={styles.input}
            />
            <h3 style={styles.label}>Comportamiento:</h3>
            <Text style={styles.label}>Puntuacion:</Text>
            <TextInput
                placeholder="Ingresar Puntuacion"
                value={formData.Puntuacion}
                onChangeText={(value) => handleChange('Puntuacion', value)}
                style={styles.input}
            />
            <View style={styles.separator} />
            <Text style={styles.labelcenter}>REPORTES DE LOS PROFESORES</Text>
            <View style={styles.br}></View>
            {Reportes.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <TextInput
                        placeholder="Ingresar Reporte"
                        value={item.Reporte}
                        onChangeText={(value) => handleReporteChange(index, 'Reporte', value)}
                        multiline
                        numberOfLines={4}
                        style={styles.textarea}
                    />
                </View>
            ))}
            <Button title="Agregar Reporte" onPress={agregarReporte} />
            <View style={styles.br} />

            <View style={styles.br} />
            <Button title="Enviar" onPress={handleSubmit}  />
        </View>
    );
}

export default ActualizarP;

const styles = StyleSheet.create({
    separator: {
        height: 3,
        backgroundColor: 'lightblue',  
        
        marginVertical: 10,      
    },
    labelcenter: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center', // Centra el texto
    },
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
        height:20,
    },
    textarea:{
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
    br: {
        height: 20,
    }
});
