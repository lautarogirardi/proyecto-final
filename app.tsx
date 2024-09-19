import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/app/(tabs)/login';
import MainScreen from '@/app/(tabs)/index';
import OlvidoSuContraseña from '@/app/(tabs)/olvidosucontraseña'; 

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  OlvidoSuContraseña: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OlvidoSuContraseña" component={OlvidoSuContraseña} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
