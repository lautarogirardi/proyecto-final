import { StyleSheet, TextInput, View, Text } from 'react-native';
import React from 'react';

const Comportamiento = () => {
  return (
    <View style={styles.container}>
      <Text>Sanciones:</Text>
      <TextInput style={styles.input} keyboardType="numeric" />
      <Text>Razon:</Text>
      <TextInput style={styles.textarea} multiline numberOfLines={10} />
      <Text>Reportes del profesor:</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default Comportamiento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    padding: 10,
  },
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '81%',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
