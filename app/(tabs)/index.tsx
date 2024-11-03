import { ImageBackground, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { BlurView} from 'expo-blur';


export default function TabOneScreen() {
  return (
    
    <ImageBackground source={require('@/fondo/epet23.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>EPET N°20</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <BlurView style={styles.blur}>
    <Link href={'/Alumnos'} style={styles.text}>Alumnos</Link>
    </BlurView>
    <View style={styles.br} />
    <BlurView style={styles.blur}>
    <Link href={'/Profesores'} style={styles.text}>Profesores</Link>
    </BlurView>
    <View style={styles.br} />
    <BlurView style={styles.blur}>
    <Link href={'/FirebaseTest'} style={styles.text}>FirebaseTest</Link>
    </BlurView>
    <View style={styles.br} />
    <BlurView style={styles.blur}>
    <Link href={'/FirebaseTest2'} style={styles.text}>FirebaseTest2</Link>
    </BlurView>
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
    resizeMode:"cover",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,

    color:'lightblue',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor:'black',

  },
  blur:{
    backgroundColor: 'lightblue',
    padding: 10 ,
    borderColor:'lightblue',
    borderWidth: 2,
    borderRadius: 5,
    cursor: 'pointer',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },

  br:{
    height:10,
  }
});
