import { StyleSheet, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { db } from '../../firebaseConfig'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Informe = () => {
    const [puntuacion, setPuntuacion] = useState('');
    const [reporte, setReporte] = useState('');
    const [informes, setInformes] = useState([]);
    const [showInformes, setShowInformes] = useState(false);

    useEffect(() => {
        if (showInformes) {
            const fetchData = async () => {
                const querySnapshot = await getDocs(collection(db, 'informes'));
                const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setInformes(data);
            };
            fetchData();
        }
    }, [showInformes]);

    const handleSave = async () => {
        try {
            await addDoc(collection(db, 'informes'), {
                puntuacion: puntuacion,
                reporte: reporte,
                timestamp: new Date(),
            });
            alert('Informe guardado exitosamente');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'informes', id));
            alert('Informe eliminado');
            setInformes((prev) => prev.filter((item) => item.id !== id));
        } catch (e) {
            console.error('Error deleting document: ', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Puntuación:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={puntuacion}
                onChangeText={setPuntuacion}
            />
            <Text style={styles.labelText}>Reportes:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline={true}
                numberOfLines={10}
                value={reporte}
                onChangeText={setReporte}
            />
            <Button title="Guardar Informe" onPress={handleSave} />
            <Button title="Ver Informes" onPress={() => setShowInformes(!showInformes)} />
            {showInformes && (
                <FlatList
                    data={informes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.informeContainer}>
                            <Text>Puntuación: {item.puntuacion}</Text>
                            <Text>Reporte: {item.reporte}</Text>
                            <Button title="Eliminar" onPress={() => handleDelete(item.id)} />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default Informe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    labelText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 15,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    informeContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: '80%',
    },
});
