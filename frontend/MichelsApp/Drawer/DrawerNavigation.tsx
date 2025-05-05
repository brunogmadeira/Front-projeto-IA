import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chatbot from '../Pages/ChatbotPage';
import CarSearch from '../Pages/CarSearchPage';
import CarRegister from '../Pages/CarRegisterPage';
import Profile from '../Pages/ProfilePage';
import CarProgress from '../Pages/CarProgressPage';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Chatbot" component={Chatbot} />
      <Drawer.Screen name="CarSearch" component={CarSearch} />
      <Drawer.Screen name="CarRegister" component={CarRegister} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="CarProgress" component={CarProgress} />
    </Drawer.Navigator>
  );
}
