import { ImageBackground, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    
    <ImageBackground source={require('@/fondo/epet20.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>EPET N°20</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

    <Link href={'/Alumnos'} style={{...styles.boton, ...styles.text}}>Alumnos</Link>
    <br />
    <Link href={'/Profesores'} style={{...styles.boton, ...styles.text}}>Profesores</Link>
    <br />
    </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor:'black',

  },
  boton:{
    backgroundColor: 'lightblue',
    
    padding: 10 ,
    
    borderRadius: 5,
    cursor: 'pointer',
  },

  text:{
    color:'black',
  },

});
