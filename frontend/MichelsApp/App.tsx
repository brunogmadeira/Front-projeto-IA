import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chatbot from './Pages/ChatbotPage';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import CarSearch from './Pages/CarSearchPage';
import CarRegister from './Pages/CarRegisterPage';
import Profile from './Pages/ProfilePage';
import CarProgress from './Pages/CarProgressPage';
import DrawerNavigation from './Drawer/DrawerNavigation';
import CarChanges from './Pages/CarChanges';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Chatbot: undefined;
  CarSearch: undefined;
  CarRegister: undefined;
  Profile: undefined;
  CarProgress: undefined;
  Sidebar: undefined;
  CarChanges: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ['http://MichelsApp.com', 'MichelsApp://'],
    config: {
      screens: {
        Login: '',
        Register: 'Register',
        Chatbot: 'Chatbot',
        CarSearch: 'CarSearch',
        CarRegister: 'CarRegister',
        Profile: 'Profile',
        CarProgress: 'CarProgress',
        CarChanges: 'CarChanges'
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CarSearch" component={CarSearch} />
        <Stack.Screen name="CarRegister" component={CarRegister} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CarProgress" component={CarProgress} />
        <Stack.Screen name="Sidebar" component={DrawerNavigation} />
        <Stack.Screen name="CarChanges" component={CarChanges} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



