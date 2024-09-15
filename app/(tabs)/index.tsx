import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SlidingCards } from 'react-native-slide-cards';
import { useRouter } from 'expo-router';
import EditScreenInfo from '@/components/EditScreenInfo'; 

interface CardData {
  id: number;
  title: string;
  buttonText: string;
  route: string;
}

export default function TabOneScreen() {
  const router = useRouter();
  const cardsData: CardData[] = [
    { id: 1, title: 'agregar curso', buttonText: 'toca para agregar cursos!', route: '/page1' },
    { id: 2, title: 'agregar profesores', buttonText: 'toca para agregar profesores!', route: '/page2' },
    // Agrega más tarjetas según sea necesario
  ];

  const renderCard = (data: CardData) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{data.title}</Text>
      <View style={styles.buttonContainer}>
        <Button title={data.buttonText} onPress={() => router.push(data.route)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPET N20</Text>
      <View style={styles.separator} />
      <SlidingCards cards={cardsData} mainContent={renderCard} />
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
    marginVertical: 20,
    height: 1,
    width: '20%',
    backgroundColor: '#eee', 
  },
  card: {
    width: '80%', // Reduce el ancho de las tarjetas
    padding: 15, // Reduce el padding de las tarjetas
    backgroundColor: '#fff',
    borderRadius: 4,
    marginVertical: 4,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16, // Reduce el tamaño de la fuente del título
    marginBottom: 8, // Reduce el margen inferior del título
  },
  buttonContainer: {
    width: '30%', // Ajusta el ancho del contenedor del botón
    marginTop: 10, // Ajusta el margen superior del contenedor del botón
  },
});
