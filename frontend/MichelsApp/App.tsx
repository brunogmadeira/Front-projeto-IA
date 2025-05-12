import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import CarRegister from './Pages/CarRegisterPage';
import CarProgress from './Pages/CarProgressPage';
import DrawerNavigation, { DrawerParamList } from './Drawer/DrawerNavigation';
import CarChanges from './Pages/CarChanges';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: { screen: keyof DrawerParamList } | undefined; // Modificação aqui
  CarRegister: undefined;
  CarProgress: { idcar: number }; // Add this line
  CarChanges: { idcar: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['http://MichelsApp.com', 'MichelsApp://'],
    config: {
      screens: {
        Login: '',
        Register: 'register',
        Main: {
          path: 'main',
          screens: {
            Chatbot: 'chatbot',
            CarSearch: 'car-search',
            Profile: 'profile',
          },
        },
        CarRegister: 'car-register',
        CarProgress: 'car-progress',
        CarChanges: 'car-changes',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={DrawerNavigation} />
        <Stack.Screen name="CarRegister" component={CarRegister} />
        <Stack.Screen name="CarProgress" component={CarProgress} />
        <Stack.Screen name="CarChanges" component={CarChanges} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}