import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, Platform, StatusBar as RNStatusBar, Modal, Alert, TouchableOpacity } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  

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
  

  const handCarPress = (carro: any) => {
    if (String(tipoUsuario) === '1') {
      setSelectedCar(carro);
      setModalVisible(true);
    } else {
      navigation.navigate('CarProgress', { idcar: carro.id, iduser: carro.iduser });
    }
  };

  const handleEditCar = () => {
    setModalVisible(false);
    navigation.navigate('CarRegister', { car: selectedCar });
  };

  const handleRemoveCar = async () => {
    setModalVisible(false);
    Alert.alert(
      'Remover carro',
      'Tem certeza que deseja remover este carro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover', style: 'destructive', onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              await axios.delete(`https://back-projeto-ia-production.up.railway.app/api/carro/delcar/${selectedCar.id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              onClienteSearchPress();
            } catch (error) {
              Alert.alert('Erro ao remover carro');
            }
          }
        }
      ]
    );
  };

  const handleOrcamentos = () => {
    setModalVisible(false);
    navigation.navigate('CarProgress', { idcar: selectedCar.id, iduser: selectedCar.iduser });
  };

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
                <CarItem key={carro.id} onPress={() => handCarPress(carro)}>
                  <CarTitle>{carro.marca} - {carro.modelo} - {carro.ano}</CarTitle>
                  <CarPlate>Placa: {carro.placa}</CarPlate>
                </CarItem>
              ))}
            </CarList>
          </StartScreen>
        </ScrollView>
      </ContentContainer>

      {/* Modal de opções do carro - apenas para admin */}
      {String(tipoUsuario) === '1' && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 24, width: '80%', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Opções do carro</Text>
              <TouchableOpacity style={{ marginBottom: 16, width: '100%' }} onPress={handleEditCar}>
                <Text style={{ fontSize: 18, color: '#007bff', textAlign: 'center' }}>Editar carro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginBottom: 16, width: '100%' }} onPress={handleRemoveCar}>
                <Text style={{ fontSize: 18, color: '#ff4444', textAlign: 'center' }}>Remover carro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%' }} onPress={handleOrcamentos}>
                <Text style={{ fontSize: 18, color: '#000', textAlign: 'center' }}>Orçamentos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 24 }} onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#888', fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
