import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarRegister'>;

export default function CarSearch() {

  const navigation = useNavigation<NavigationProp>();

  const navigationDrawer = useNavigation<DrawerNavigationProp<any>>();

  const onClienteSearchPress = () => {
    console.log('Busca de cliente (placeholder)');
  };

  const carros = [
    {
      id: '1',
      nome: 'Ford Fiesta',
      ano: '2015',
      placa: 'ABC - 1D23',
    },
    {
      id: '2',
      nome: 'Ford Thunderbird',
      ano: '1955',
      placa: 'EFG - 4H56',
    },
  ];
  

  return (
    <Container>
      
      <TopBar>
        <MenuButton onPress={() => navigationDrawer.toggleDrawer()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </MenuButton>
        <AddButton onPress={() => navigation.navigate('CarRegister')}>
          <Ionicons name="add" size={26} color="#fff" />
        </AddButton>
      </TopBar>

      <StartScreen>
      <Title>Buscar carros</Title>
        <Search>
          <Input
              placeholder="Modelo, placa ou ano"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
            />
          <SearchButton onPress={onClienteSearchPress}>
            <Ionicons name="search" size={20} color="#000" />
         </SearchButton>
        </Search>

        <CarList>
        {carros.map((carro) => (
        <CarItem key={carro.id} onPress={() => navigation.navigate('CarProgress')}>
        <CarTitle>{carro.nome} - {carro.ano}</CarTitle>
      <CarPlate>Placa: {carro.placa}</CarPlate>
    </CarItem>
  ))}
</CarList>
 
      </StartScreen>
   </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: top;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

const StartScreen = styled.View`
  margin-top: ${height * 0.10}px;
  align-items: center;
  width: 100%;
`;

const Title = styled.Text`
  font-size: ${width * 0.08}px;
  font-weight: bold;
  font-color: #000;
  margin-bottom:${height * 0.02}px; 
  width: 100%;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const MenuButton = styled.TouchableOpacity``;

const AddButton = styled.TouchableOpacity``;

const Search = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${height * 0.06}px;
  border: 2px solid #000;
  margin-bottom: ${height * 0.02}px;
  padding: 0 10px;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #000;
`;

const SearchButton = styled.TouchableOpacity`
  padding-left: 10px;
`;

const CarList = styled.View`
  width: 100%;
`;

const CarItem = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border: 2px solid #000;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const CarTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  width: 100%;
`;

const CarPlate = styled.Text`
  font-size: 16px;
  color: #444;
`;
