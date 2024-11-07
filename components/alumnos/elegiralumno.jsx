import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Elegir = () => {
  const [selectedValue, setSelectedValue] = useState('alumno1');

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Elegir Alumnos:</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Alumno 1" value="alumno1" />
        <Picker.Item label="Alumno 2" value="alumno2" />
        <Picker.Item label="Alumno 3" value="alumno3" />
      </Picker>
    </View>
  );
};

export default Elegir;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '20%',
    padding: 1,
  },
  labelText: {
    fontSize: 15,
    marginBottom: 1,
  },
  picker: {
    height: 20,
    width: '100%',
  },
});
