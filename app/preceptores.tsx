import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SlidingCards } from 'react-native-slide-cards';
import { useRouter } from 'expo-router';

interface CardData {
  id: number;
  title: string;
  buttonText: string;
  route: string;
}

export default function Preceptores() {
  const router = useRouter();
  const cardsData: CardData[] = [
    { id: 1, title: 'cursos', buttonText: 'Toca para ver info sobre los cursos!', route: '/curso' },
    { id: 2, title: 'informe profesores', buttonText: 'Toca para hacer un informe a algún profesor!', route: '/profesores' },
    { id: 3, title: 'alumnos', buttonText: 'Toca para ver info sobre los alumnos!', route: '/alumnos' },
  ];

  useEffect(() => {
    const handleBackButton = () => {
      const isAuthenticated = true; 

      if (!isAuthenticated) {
        router.replace("/(tabs)/"); // Si no está autenticado volvemos a login
      } else {
        router.replace('/preceptores'); // Llevamos a nuestra página principal de preceptores
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [router]);

  const renderCard = (data: CardData) => (
    <View style={styles.card} key={data.id}>
      <Text style={styles.cardTitle}>{data.title}</Text>
      <View style={styles.buttonContainer}>
        <Button title={data.buttonText} onPress={() => router.push(data.route)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preceptores</Text>
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
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  card: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
