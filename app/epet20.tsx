import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import CustomButton from '@/components/curso/boton';  // Tu componente personalizado

const epet20: React.FC = () => {
  const router = useRouter();
  const cardsData = [
    { id: 1, title: 'Cursos', buttonText: 'Toca para ver info sobre los cursos!', route: '/cursoUsuario' },
    { id: 3, title: 'Alumnos', buttonText: 'Toca para ver info sobre los alumnos!', route: '/alumnoUsuario' },
  ];

  return (
    // Imagen de fondo para la pantalla principal
    <ImageBackground source={require('@/assets/images/epet.jpg')} style={styles.background}>
      {/* BlurView para el efecto de desenfoque en el fondo */}
      <BlurView intensity={50} style={styles.blurContainer}>
        {/* Título de la pantalla */}
        <Text style={styles.title}>EPET N20</Text>
        {/* Separador visual */}
        <View style={styles.separator} />
        {/* Mapeo de datos para renderizar las tarjetas */}
        {cardsData.map((data) => (
          <View style={styles.card} key={data.id}>
            <Text style={styles.cardTitle}>{data.title}</Text>
            <CustomButton title={data.buttonText} onPress={() => router.push(data.route)} />
          </View>
        ))}
      </BlurView>
    </ImageBackground>
  );
};

export default epet20;

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
