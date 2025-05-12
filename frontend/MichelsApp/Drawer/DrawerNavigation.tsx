import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chatbot from '../Pages/ChatbotPage';
import CarSearch from '../Pages/CarSearchPage';
import Profile from '../Pages/ProfilePage';

export type DrawerParamList = {
  Chatbot: undefined;
  CarSearch: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Chatbot" // Adicione esta linha
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Chatbot" component={Chatbot} options={{ title: 'Atendimento' }}/>
      <Drawer.Screen name="CarSearch" component={CarSearch} options={{ title: 'Buscar Carros' }}/>
      <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }}/>
    </Drawer.Navigator>
  );
}