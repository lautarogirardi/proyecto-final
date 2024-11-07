import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

const MainScreen = () => {
  const router = useRouter();
  const cardsData = [
    { id: 1, title: 'cursos', buttonText: 'toca para ver info sobre los cursos!', route: '/' },
    { id: 2, title: 'informe profesores', buttonText: 'toca para hacer un informe a algun profesor!', route: '/informeprofesor' },
    { id: 3, title: 'alumnos', buttonText: 'toca para ver info sobre los alumnos!', route: '/alumnos' },
    { id: 4, title: 'curso', buttonText: 'toca para ver info sobre el curso!', route: '/curso' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPET N20</Text>
      <View style={styles.separator} />
      {cardsData.map((data) => (
        <View style={styles.buttonContainer} key={data.id}>
          <Button title={data.buttonText} onPress={() => router.push(data.route)} />
        </View>
      ))}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '90%',
    backgroundColor: '#eee',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});
