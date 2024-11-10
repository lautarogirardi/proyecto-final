import React from 'react';
import useFirestoreCollection from '@/src/hooks/useFirestoreCollection';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-web';

const MateriasList = () => {
    const materias = useFirestoreCollection('materias');

    return (
        <View>
            <Text style={styles.label}>Lista de Materias</Text>
            <ul>
                {materias.map(materia => (
                    <li key={materia.id} style={styles.label}>
                        {materia.materia} 
                    </li>
                ))}
            </ul>
        </View>
    );
};

export default MateriasList;

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
        borderRadius: 10,
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
        fontWeight: '',
    }

});
