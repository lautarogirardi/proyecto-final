import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
function Actualizar() {
    const [formData, setFormData] = useState({ //se inicializa el estado formdata con valores vacios
        Nombre: '',
        dni: '',
        Faltas: '',
        Sanciones: '',
        Telefono: '',
        Email: '',
        Direccion: ''
    });
    const [materias, setMaterias] = useState([{ materia: '', nota: '' }]);// se inicializa el estado materias como un arreglo con los valores vacios
    const [materiasPrevias, setMateriasPrevias] = useState([{ materiaPrevia: '', notaMateriaPrevia: '' }]);// se inicializa el estado materiasprevias como un arreglo con los valores vacios
    const [Reportes, setReportes] = useState([{ Reporte: '' }]);// se inicializa el estado reportes como un arreglo con los valores vacios
    const [dniBusqueda, setDniBusqueda] = useState('');//se inicializa el estado dnibusqueda con un valor vacio
    const [alumnoId, setAlumnoId] = useState(null);//se inicializa el estado alumnoid como null
    const [listaMaterias, setListaMaterias] = useState([]);//se inicializa el estado listamaterias como un arreglo vacio

    useEffect(() => {
        const cargarMaterias = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'materias'));
                const materiasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea los documentos obtenidos a un formato con el id de cada materia
                setListaMaterias(materiasData);// Actualiza el estado con los datos de las materias
            } catch (error) {
                console.error("Error al obtener materias: ", error);
                window.alert("Error al obtener materias: ");
            }
        };
        cargarMaterias();
    }, []);

    const handleChange = (name, value) => {//actualiza el estado de formdata
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleMateriaChange = (index, field, value) => {
        if (index >= 0 && index < materias.length) {// asegura que el índice sea válido
            const newMaterias = [...materias];
            newMaterias[index][field] = value;// modifica el campo especificado de la materia
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
        const lastMateria = materias[materias.length - 1];// obtiene la última materia del arreglo
        if (!lastMateria.materia || !lastMateria.nota) {// verifica si el campo materia o nota está vacio
            Alert.alert("Error", "Completar materia y nota.");
            window.alert("Error: Completar materia y nota.");
            return;
        }
        setMaterias([...materias, { materia: '', nota: '' }]);


        const materiaExiste = materias.some((item, index) => item.materia === lastMateria.materia && index !== materias.length - 1) ||// verifica si ya existe la materia en el arreglo
            materiasPrevias.some(item => item.materiaPrevia === lastMateria.materia);// verifica si la materia en las materias previas

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
            Alert.alert("Error: Complete todos los campos de la materia previa antes de agregar otra.");

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
            window.alert("Error: Completar el reporte.");
            return;
        }
        setReportes([...Reportes, { Reporte: '' }]);

    };

    const buscarPorDni = async () => {
        if (!dniBusqueda) {//verifica si se ingreso el dni
            Alert.alert("Error", "Por favor, ingrese un DNI para buscar");
            window.alert("Error: Por favor, ingrese un DNI para buscar");
            return;
        }

        try {
            const alumnoQuery = query(collection(db, 'alumnos'), where("dni", "==", dniBusqueda));//crea una consulta buscando el valor dni es igual a alguno de la coleccion
            const querySnapshot = await getDocs(alumnoQuery);//ejecuta la consulta

            if (querySnapshot.empty) {//sino se cumple la consulta:
                Alert.alert("No encontrado", "No se encontró ningún alumno con ese DNI");
                Alert.window("No se encontró ningún alumno con ese DNI");
            } else {
                const alumnoEncontrado = querySnapshot.docs[0];//obtiene al alumno encontrado
                setAlumnoId(alumnoEncontrado.id);//establece el id del alumno encontrado
                const data = alumnoEncontrado.data();//trae los datos del alumno encontrado

                setFormData({//actualiza el estado con los datos encontrados
                    Nombre: data.Nombre || '',//sino se encuentra el valor lo deja al campo vacio
                    dni: data.dni || '',
                    Faltas: data.Faltas || '',
                    Sanciones: data.Sanciones || '',
                    Telefono: data.Telefono || '',
                    Email: data.Email || '',
                    Direccion: data.Direccion || ''
                });
                //se actualizan los datos
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
            console.error("Error al buscar el alumno: ", error);
            Alert.alert("Error", "Ocurrió un error al buscar el alumno");
            window.alert("Error: Ocurrió un error al buscar el alumno");
        }
    };


    const handleSubmit = async () => {
        if (!formData.Nombre || !formData.dni || !formData.Faltas || !formData.Sanciones || !formData.Telefono || !formData.Email || !formData.Direccion) {//verifica si se completo todos los campos 
            Alert.alert("Error", "Por favor, complete todos los campos.");
            window.alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const dniQuery = query(// crea una consulta para buscar si el DNI ya está registrado en la colección alumnos
                collection(db, 'alumnos'),
                where("dni", "==", formData.dni)
            );
            const dniSnapshot = await getDocs(dniQuery);

            if (!dniSnapshot.empty && dniSnapshot.docs[0].id !== alumnoId) {// si el DNI ya está registrado y no pertenece al alumno actual
                Alert.alert("Error", "El DNI ya está registrado con otro alumno.");
                window.alert("Error: El DNI ya está registrado con otro alumno.");
                return;
            }

            if (alumnoId) {// Si ya se ha encontrado un alumno 
                await updateDoc(doc(db, 'alumnos', alumnoId), {//actualiza el documento del alumnoId
                    ...formData,// Mantiene los datos del formulario
                    Reportes: Reportes.filter(item => item.Reporte),//se filtran los reportes vacios
                    materias: materias.filter(item => item.materia && item.nota),//se filtran las materias vacias
                    materiasPrevias: materiasPrevias.filter(item => item.materiaPrevia && item.notaMateriaPrevia)// se filtran las materiasprevias vacias
                });
                Alert.alert("Éxito", "alumno actualizado correctamente");
                window.alert("alumno actualizado correctamente");
            } else {
                Alert.alert("Error", "Primero busca un alumno por DNI");
                window.alert("Primero busca un alumno por DNI");
            }
        } catch (error) {
            console.error("Error al actualizar el alumno: ", error);
            Alert.alert("Error", "No se pudo actualizar el alumno");
            window.alert("Error: No se pudo actualizar el alumno");
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar por DNI"
                value={dniBusqueda}
                onChangeText={setDniBusqueda}//Actualiza el estado dnibusqueda
                style={styles.input}
            />

            <Button title="Buscar" onPress={buscarPorDni} /> //ejecuta buscarpordni
            <View style={styles.br}></View>


            <Text style={styles.label}>Nombre Completo:</Text>
            <TextInput
                placeholder="Ingresar Nombre Completo"
                value={formData.Nombre}
                onChangeText={(value) => handleChange('Nombre', value)}//actualiza formdata
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
                        selectedValue={item.materia}//valor seleccionado para la materia
                        onValueChange={(value) => handleMateriaChange(index, 'materia', value)}//actualiza la materia seleccionada
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccionar Materia" value="" />
                        {listaMaterias.map((materia) => (
                            <Picker.Item key={materia.id} label={materia.materia} value={materia.materia} />//muestra las materias disponibles
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
            //llama a la funcion agregar materia
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
        textAlign: 'center', 
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

