import { ImageBackground, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { BlurView} from 'expo-blur';

export default function TabOneScreen() {
  return (
    
    <ImageBackground source={require('@/fondo/epet21.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>EPET N°20</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <BlurView style={styles.blur}>
    <Link href={'/Alumnos'} >Alumnos</Link>
    </BlurView>
    <View style={styles.br} />
    <BlurView style={styles.blur}>
    <Link href={'/Profesores'} >Profesores</Link>
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
  blur:{
    backgroundColor: 'lightblue',
    fontFamily:'arial',
    fontWeight:'bold',
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
