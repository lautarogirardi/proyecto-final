import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
function Actualizar() {
    const [formData, setFormData] = useState({
        Nombre: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Telefono: '',
        Email: '',
        Direccion: ''
    });
    const [materias, setMaterias] = useState([{ materia: '', nota: '' }]);
    const [materiasPrevias, setMateriasPrevias] = useState([{ materiaPrevia: '', notaMateriaPrevia: '' }]);
    const [Reportes, setReportes] = useState([{ Reporte: '' }]);
    const [dniBusqueda, setDniBusqueda] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);
    const [listaMaterias, setListaMaterias] = useState([]);

    useEffect(() => {
        const cargarMaterias = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'materias'));
                const materiasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListaMaterias(materiasData);
            } catch (error) {
                console.error("Error al obtener materias: ", error);
            }
        };
        cargarMaterias();
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleMateriaChange = (index, field, value) => {
        if (index >= 0 && index < materias.length) {
            const newMaterias = [...materias];
            newMaterias[index][field] = value;
            setMaterias(newMaterias);
        }
    };

    const handleMateriaPreviaChange = (index, field, value) => {
        if (index >= 0 && index < materiasPrevias.length) {
            const newMateriasPrevias = [...materiasPrevias];
            newMateriasPrevias[index][field] = value;
            setMateriasPrevias(newMateriasPrevias);
        }
    };

    const handleReporteChange = (index, field, value) => {
        if (index >= 0 && index < Reportes.length) {
            const newReportes = [...Reportes];
            newReportes[index][field] = value;
            setReportes(newReportes);
        }
    };
    const agregarMateria = () => {
        const lastMateria = materias[materias.length - 1];
        if (!lastMateria.materia || !lastMateria.nota) {
            Alert.alert("Error", "Completar materia y nota.");
            return;
        }
        setMaterias([...materias, { materia: '', nota: '' }]);


        const materiaExiste = materias.some((item, index) => item.materia === lastMateria.materia && index !== materias.length - 1) ||
            materiasPrevias.some(item => item.materiaPrevia === lastMateria.materia);

        if (materiaExiste) {
            Alert.alert("Error", "La materia no puede duplicarse ni coincidir con una materia previa.");
            window.alert("Error: La materia no puede duplicarse ni coincidir con una materia previa.");
            return;
        }

        setMaterias([...materias, { materia: '', nota: '' }]);
    };

    const agregarMateriaPrevia = () => {
        const lastMateriaPrevia = materiasPrevias[materiasPrevias.length - 1];
        if (!lastMateriaPrevia || !lastMateriaPrevia.materiaPrevia || !lastMateriaPrevia.notaMateriaPrevia) {
            Alert.alert("Error", "Complete todos los campos de la materia previa antes de agregar otra.");
            return;
        }
        const materiaPreviaExiste = materiasPrevias.some((item, index) => item.materiaPrevia === lastMateriaPrevia.materiaPrevia && index !== materiasPrevias.length - 1) ||
            materias.some(item => item.materia === lastMateriaPrevia.materiaPrevia);

        if (materiaPreviaExiste) {
            Alert.alert("Error", "La materia previa no puede duplicarse ni coincidir con una materia.");
            window.alert("Error: La materia previa no puede duplicarse ni coincidir con una materia.");
            return;
        }

        setMateriasPrevias([...materiasPrevias, { materiaPrevia: '', notaMateriaPrevia: '' }]);
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
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const estudianteQuery = query(collection(db, 'alumnos'), where("dni", "==", dniBusqueda));
            const querySnapshot = await getDocs(estudianteQuery);

            if (querySnapshot.empty) {
                Alert.alert("No encontrado", "No se encontró ningún estudiante con ese DNI");
            } else {
                const estudianteEncontrado = querySnapshot.docs[0];
                setEstudianteId(estudianteEncontrado.id);
                const data = estudianteEncontrado.data();

                setFormData({
                    Nombre: data.Nombre || '',
                    dni: data.dni || '',
                    Faltas: data.Faltas || '',
                    Sanciones: data.Sanciones || '',
                    Telefono: data.Telefono || '',
                    Email: data.Email || '',
                    Direccion: data.Direccion || ''
                });
                setMaterias(data.materias && data.materias.length > 0
                    ? data.materias
                    : [{ materia: '', nota: '' }]);

                
                setMateriasPrevias(data.materiasPrevias && data.materiasPrevias.length > 0
                    ? data.materiasPrevias
                    : [{ materiaPrevia: '', notaMateriaPrevia: '' }]);

                setReportes(data.Reportes && data.Reportes.length > 0
                    ? data.Reportes
                    : [{ Reporte: '' }]);
            }
        } catch (error) {
            console.error("Error al buscar el estudiante: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el estudiante");
            window.alert("Error: Ocurrió un error al buscar el estudiante");
        }
    };


    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.dni || !formData.Faltas || !formData.Sanciones || !formData.Telefono || !formData.Email || !formData.Direccion) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const dniQuery = query(
                collection(db, 'alumnos'),
                where("dni", "==", formData.dni)
            );
            const dniSnapshot = await getDocs(dniQuery);

            if (!dniSnapshot.empty && dniSnapshot.docs[0].id !== estudianteId) {
                Alert.alert("Error", "El DNI ya está registrado con otro estudiante.");
                window.alert("Error: El DNI ya está registrado con otro estudiante.");
                return;
            }

            if (estudianteId) {
                await updateDoc(doc(db, 'alumnos', estudianteId), {
                    ...formData,
                    Reportes: Reportes.filter(item => item.Reporte),
                    materias: materias.filter(item => item.materia && item.nota),
                    materiasPrevias: materiasPrevias.filter(item => item.materiaPrevia && item.notaMateriaPrevia)
                });
                Alert.alert("Éxito", "Estudiante actualizado correctamente");
                window.alert("Estudiante actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un estudiante por DNI");
                window.alert("Primero busca un estudiante por DNI");
            }
        } catch (error) {
            console.error("Error al actualizar el estudiante: ", error);
            Alert.alert("Error", "No se pudo actualizar el estudiante");
            window.alert("Error: No se pudo actualizar el estudiante");
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


            <Button title="Buscar" onPress={buscarPorDni} />
            <View style={styles.br}></View>


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
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Telefono:</Text>
            <TextInput
                placeholder="Ingresar Telefono"
                value={formData.Telefono}
                onChangeText={(value) => handleChange('Telefono', value)}
                keyboardType="phone-pad"
                style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Ingresar Email"
                value={formData.Email}
                onChangeText={(value) => handleChange('Email', value)}
                keyboardType="email-address"
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
            <View style={styles.br}></View>

            <View style={styles.separator} />
            <Text style={styles.labelcenter}>CALIFICACIONES</Text>
            <View style={styles.br}></View>

            {materias.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.label}>Materia:</Text>
                    <Picker
                        selectedValue={item.materia}
                        onValueChange={(value) => handleMateriaChange(index, 'materia', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccionar Materia" value="" />
                        {listaMaterias.map((materia) => (
                            <Picker.Item key={materia.id} label={materia.materia} value={materia.materia} />
                        ))}
                    </Picker>
                    <TextInput
                        placeholder="Ingresar Nota"
                        value={item.nota}
                        onChangeText={(value) => handleMateriaChange(index, 'nota', value)}
                        style={styles.input}
                    />
                </View>
            ))}
            <Button title="Agregar Materia" onPress={agregarMateria} />


            <View style={styles.separator} />
            <Text style={styles.labelcenter}>MATERIAS PREVIAS</Text>
            <View style={styles.br}></View>
            {materiasPrevias.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.label}>Materia Previa:</Text>
                    <Picker
                        selectedValue={item.materiaPrevia}
                        onValueChange={(value) => handleMateriaPreviaChange(index, 'materiaPrevia', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccionar Materia" value="" />
                        {listaMaterias.map((materia) => (
                            <Picker.Item key={materia.id} label={materia.materia} value={materia.materia} />
                        ))}
                    </Picker>
                    <TextInput
                        placeholder="Ingresar Nota"
                        value={item.notaMateriaPrevia}
                        onChangeText={(value) => handleMateriaPreviaChange(index, 'notaMateriaPrevia', value)}
                        style={styles.input}
                    />
                </View>
            ))}
            <Button title="Agregar Materia Previa" onPress={agregarMateriaPrevia} />

            <Text style={styles.label}>Sanciones:</Text>
            <TextInput
                placeholder="Ingresar Sanciones"
                value={formData.Sanciones}
                onChangeText={(value) => handleChange('Sanciones', value)}
                multiline
                numberOfLines={4}
                style={styles.textarea}
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

            <Button title="Guardar Cambios" onPress={handleSubmit} color="green" />
        </View>
    );
}

export default Actualizar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    separator: {
        height: 3,
        backgroundColor: 'lightblue',  
        marginVertical: 10,       
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
    labelcenter: {
        fontFamily: 'arial',
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center', // Centra el texto
    },
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
    br: {
        height: 20,
    }
});

