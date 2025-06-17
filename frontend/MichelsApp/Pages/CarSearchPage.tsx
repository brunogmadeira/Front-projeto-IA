import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarRegister'>;

export default function CarSearch() {

  const [carros, setCarros] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const navigationDrawer = useNavigation<DrawerNavigationProp<any>>();
  

    useEffect(() => {
      const carregarTipoUsuario = async () => {
        try {
          const tipo = await AsyncStorage.getItem('userTipo');
          setTipoUsuario(tipo);
        } catch (error) {
          console.error('Erro ao carregar tipo do usuário:', error);
        }
      };

      carregarTipoUsuario();
      onClienteSearchPress();
    }, []);

  const onClienteSearchPress = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      const tipo = await AsyncStorage.getItem('userTipo');
      if (!token || !userId) {
        console.log('Token ou ID do usuário não encontrado');
        return;
      }
      let response;
      
      if (tipo === '2') {
        response = await axios.get(`https://back-projeto-ia-production.up.railway.app/api/carro/getall/bycliente/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });}else{
        response = await axios.get(`https://back-projeto-ia-production.up.railway.app/api/carro/getall`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
      }
      console.log('Resposta da API:', response.data);



      const data = response.data;

      const filtrados = searchText
        ? data.filter((carro: any) =>
            carro.modelo.toLowerCase().includes(searchText.toLowerCase()) ||
            carro.placa.toLowerCase().includes(searchText.toLowerCase()) || 
            carro.marca.toLowerCase().includes(searchText.toLowerCase()) || 
            carro.ano.toString().includes(searchText)
          )
        : data;

      setCarros(filtrados);

    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    }
  };
  

  const handCarPress = (carroId: number) => {
    navigation.navigate('CarProgress', { idcar: carroId });
    return;
  }

  return (
     <Container>
      <TopBar>
        <MenuButton onPress={() => navigationDrawer.toggleDrawer()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </MenuButton>
      {tipoUsuario === '1' && (
        <AddButton onPress={() => navigation.navigate('CarRegister')}>
          <Ionicons name="add" size={26} color="#fff" />
        </AddButton>
      )}
      </TopBar>

      <ContentContainer>
        <ScrollView style={{ width: '100%' }}>
          <StartScreen>
            {tipoUsuario === '1' && (
              <Title>Buscar carros</Title>
            )}
            {tipoUsuario === '2' && (
              <Title>Seus carros</Title>
            )}
            <Search>
              <Input
                placeholder="Modelo, placa ou ano"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                value={searchText}
                onChangeText={setSearchText}
              />
              <SearchButton onPress={onClienteSearchPress}>
                <Ionicons name="search" size={20} color="#000" />
              </SearchButton>
            </Search>

            <CarList>
              {carros.map((carro: any) => (
                <CarItem key={carro.id} onPress={() => handCarPress(carro.id)}>
                  <CarTitle>{carro.marca} - {carro.modelo} - {carro.ano}</CarTitle>
                  <CarPlate>Placa: {carro.placa}</CarPlate>
                </CarItem>
              ))}
            </CarList>
          </StartScreen>
        </ScrollView>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? ((RNStatusBar.currentHeight || 0) + height * 0.08) : height * 0.08}px;
`;

const TopBar = styled.View`
  position: absolute;
  top: ${Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) : 0}px;
  left: 0;
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 1;
`;

const StartScreen = styled.View`
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: ${width * 0.08}px;
  font-weight: bold;
  font-color: #000;
  margin-bottom:${height * 0.02}px; 
  width: 100%;
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
