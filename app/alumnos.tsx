import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Informe  from '@/components/formularioinforme';
import Comportamiento  from '@/components/formulariocomportamiento';
import Elegir  from '@/components/elegiralumno';

interface Section {
id: number;
name: string;
}

function InformeEstudiante() {
const [activeSection, setActiveSection] = useState<Section>({ id: 1, name: 'informe' });

const handleButtonClick = (section: Section) => {
    setActiveSection(section);
};

return (
  <div >
    <Elegir></Elegir>
    <View  style={styles.container}>
    <div >
    <h1>Informe de Estudiante: </h1>

    <div >
        <button onClick={() => handleButtonClick({ id: 1, name: 'informe' })} style={styles.boton}>Informe</button>
        <button onClick={() => handleButtonClick({ id: 2, name: 'comportamiento' })} style={styles.boton} >Comportamiento</button>
    </div>

    {activeSection.name === 'informe' && (
        <div> <Informe></Informe></div>
        
    )}

    {activeSection.name === 'comportamiento' && (
        <div>
          <Comportamiento></Comportamiento>
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