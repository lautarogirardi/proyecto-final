import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import CustomButton from '@/components/curso/boton';  

interface CardData {
  id: number;
  title: string;
  buttonText: string;
  route: string;
}

const Admin: React.FC = () => {
  const router = useRouter();
  const cardsData: CardData[] = [
    { id: 1, title: 'Cursos', buttonText: 'Toca para gestionar los cursos!', route: '/curso' },
    { id: 2, title: 'Informe Profesores', buttonText: 'Toca para gestionar a los profesores!', route: '/profesores' },
    { id: 3, title: 'Alumnos', buttonText: 'Toca para para gestionar a los alumnos!', route: '/alumnos' },
    { id: 4, title: 'Preceptores', buttonText: 'Toca para gestionar preceptores!', route: '/preceptores' },
    { id: 5, title: 'Materias', buttonText: 'Toca para gestionar las materias!', route: '/materias' }
  ];

  useEffect(() => {               
    const handleBackButton = () => {
      const isAuthenticated = true;

      if (!isAuthenticated) {
        router.replace("/(tabs)/"); // Si no está autenticado volvemos a login
      } else {
        router.replace('/admin'); // Llevamos a nuestra página principal de admin
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [router]);

  return (
    // Imagen de fondo para la pantalla de administración
    <ImageBackground source={require('@/assets/images/epet20.jpg')} style={styles.background}>
      {/* BlurView para el efecto de desenfoque en el fondo */}
      <BlurView intensity={50} style={styles.blurContainer}>
        {/* Habilitando el desplazamiento vertical */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Título de la pantalla */}
          <Text style={styles.title}>Administración</Text>
          {/* Separador visual */}
          <View style={styles.separator} />
          {/* Mapeo de datos para renderizar las tarjetas */}
          {cardsData.map((data) => (
            <View style={styles.card} key={data.id}>
              <Text style={styles.cardTitle}>{data.title}</Text>
              <CustomButton title={data.buttonText} onPress={() => router.push(data.route)} />
            </View>
          ))}
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
};

export default Admin;

/* Estilos para el componente */
const styles = StyleSheet.create({
  /* Estilo para la imagen de fondo */
  background: {
    flex: 1,
    width: '100%',  // Expande la imagen a todo el ancho de la pantalla
    height: '100%', // Expande la imagen a toda la altura de la pantalla
    resizeMode: 'cover',  // Esta propiedad determina cómo se redimensionará la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Contenedor del desenfoque */
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',  // Fondo semi-transparente para el efecto de desenfoque
    borderRadius: 10,
  },
  /* Estilo para el contenido del ScrollView */
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  /* Estilo para el título */
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  /* Estilo para el separador */
  separator: {
    marginVertical: 20,
    height: 2,
    width: '80%',
    backgroundColor: '#fff',
  },
  /* Estilo para las tarjetas */
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  /* Estilo para el título de las tarjetas */
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});
