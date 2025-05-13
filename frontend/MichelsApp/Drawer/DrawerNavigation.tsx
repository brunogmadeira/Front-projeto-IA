import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import Chatbot from '../Pages/ChatbotPage';
import CarSearch from '../Pages/CarSearchPage';
import Profile from '../Pages/ProfilePage';

export type DrawerParamList = {
  Chatbot: undefined;
  CarSearch: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/michelslogocorrigido.jpeg')} style={styles.logo} />
        <Text style={styles.username}>Usuário</Text>
      </View>

      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Chatbot')}>
        <Text style={styles.itemText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('CarSearch')}>
        <Text style={styles.itemText}>Acompanhamento do carro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Profile')}>
        <Text style={styles.itemText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Chatbot"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Chatbot" component={Chatbot} />
      <Drawer.Screen name="CarSearch" component={CarSearch} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',     
    alignItems: 'center',    
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
    marginBottom: 5,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,

  },
  separator: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
