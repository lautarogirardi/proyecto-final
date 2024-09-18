import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Informe  from '@/alumnos/formInforme';
import Comportamiento  from '@/alumnos/formComportamiento';
import ElegirP from '@/profesores/elegirProfesor';

interface Section {
id: number;
name: string;
}

function InformeEstudiante() {
const [activeSection, setActiveSection] = useState<Section>({ id: 1, name: 'materias' });

const handleButtonClick = (section: Section) => {
    setActiveSection(section);
};

return (
  <div >
    <ElegirP></ElegirP>
    <View  style={styles.container}>
    <div >
    <h1>Informe de Profesores: </h1>

    <div >
        <button onClick={() => handleButtonClick({ id: 1, name: 'materias' })} style={styles.boton}>Materias</button>
        <button onClick={() => handleButtonClick({ id: 2, name: 'informe' })} style={styles.boton} >Informe</button>
    </div>

    {activeSection.name === 'materias' && (
        <div> </div>
        
    )}

    {activeSection.name === 'informe' && (
        <div>
          
        </div>
    )}
    </div>
    </View>
    </div>
);
}

export default InformeEstudiante;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    text: {
      color: 'white',
    },
    boton:{
      backgroundColor: 'lightblue',

      padding: 10 ,
      
      borderRadius: 5,
      cursor: 'pointer',
      
    },
    fondo:{
      backgroundColor:'lightblue',
    }
  });