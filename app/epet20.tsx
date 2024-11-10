import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

interface CardData {
  id: number;
  title: string;
  buttonText: string;
  route: string;
}

export default function MainScreen() {
  const router = useRouter();
  const cardsData: CardData[] = [
    { id: 1, title: 'Cursos', buttonText: 'Toca para ver info sobre los cursos!', route: '/curso' },
    { id: 2, title: 'Informe profesores', buttonText: 'Toca para hacer un informe a algún profesor!', route: '/profesores' },
    { id: 3, title: 'Alumnos', buttonText: 'Toca para ver info sobre los alumnos!', route: '/alumnos' },
  ];

  useEffect(() => {
    const handleBackButton = () => {
      const isAuthenticated = false;

      if (!isAuthenticated) {
        router.replace("/(tabs)/");
      } else {
        router.replace('/epet20');
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [router]);

  const renderCard = ({ item }: { item: CardData }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.buttonContainer}>
        <Button title={item.buttonText} onPress={() => router.push(item.route)} color="#007bff" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPET N20</Text>
      <View style={styles.separator} />
      <FlatList
        data={cardsData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent} // Ajuste en FlatList
        showsVerticalScrollIndicator={false} // Ocultar barra de desplazamiento si es necesario
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
  },
  flatListContent: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 30, 
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
});
