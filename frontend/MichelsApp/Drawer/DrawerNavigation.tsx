import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['userToken', 'userId', 'userTipo']);
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as any }],
              });
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/michelslogocorrigido.jpeg')} style={styles.logo} />
        <Text style={styles.username}>MichelsApp</Text>
      </View>

      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Chatbot')}>
        <Text style={styles.itemText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('CarSearch')}>
        <Text style={styles.itemText}>Acompanhamento do carro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Profile')}>
        <Text style={styles.itemText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={32} color="#ff6b6b" style={styles.logoutIcon} />
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
    paddingBottom: 50,
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
    fontSize: 22,
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
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    marginTop: 'auto',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  logoutIcon: {
    alignContent : 'flex-start'
  },
});
