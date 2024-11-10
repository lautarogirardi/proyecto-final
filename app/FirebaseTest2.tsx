import { ImageBackground, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { ScrollView } from 'react-native';


function agregarUsuario() {

    return (
      <ScrollView>
        <View style={{ padding: 20 }}>

        </View>
        </ScrollView>
    );
}

export default agregarUsuario;

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
