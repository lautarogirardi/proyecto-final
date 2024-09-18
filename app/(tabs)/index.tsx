import { ImageBackground, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    
      
    <View style={styles.container}>
      <Text style={styles.title}>EPET N°20</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <Link href={'/cursos'} style={{...styles.boton, ...styles.text}} >Cursos</Link>
    
    <br />
    <Link href={'/alumnos'} style={{...styles.boton, ...styles.text}}>Alumnos</Link>
    <br />
    
   

      
  

    
    
    </View>
    
  );
}

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
  boton:{
    backgroundColor: 'lightblue',
    
    padding: 10 ,
    
    borderRadius: 5,
    cursor: 'pointer',
  },

  text:{
    color:'white',
  },

});
