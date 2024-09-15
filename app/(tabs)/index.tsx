import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed'; 
import EditScreenInfo from '@/components/EditScreenInfo'; 

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPET N20</Text>
      <View style={styles.separator} />
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
    backgroundColor: '#eee', 
  },
});