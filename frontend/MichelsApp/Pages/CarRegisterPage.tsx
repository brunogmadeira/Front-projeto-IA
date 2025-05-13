import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function CarRegister() {
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carPlate, setCarPlate] = useState('');
    const [carRenavam, setCarRenavam] = useState('');
    const [carKM, setCarKM] = useState('');
    const [carOwnerId, setCarOwnerId] = useState('');
    const [carOwnerName, setCarOwnerName] = useState('');
    const [clientes, setClientes] = useState([]);
    const [showClientList, setShowClientList] = useState(false);
    const [searchText, setSearchText] = useState('');

    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarRegister'>;
    
    const navigation = useNavigation<NavigationProp>();

    const novoCarro = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(`http://localhost:8080/api/carro/newcar`, {
        modelo: carModel,
        ano: carYear,     
        marca: carBrand,
        placa : carPlate,
        iduser: carOwnerId,
        cor: carColor,
        renavam: carRenavam,
        km: carKM,
      },
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });

      console.log(response.request)
 
      if (response.status === 200 ){
        console.log('Cadastro realizado com sucesso');
      navigation.navigate('Main', { screen: 'CarSearch' });
      } else {
        console.log('Erro');
      }

    } catch (error: any) {
      console.log('Erro ao cadastrar carro', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:8080/api/carro/getall/clients',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      setClientes(response.data);
      setShowClientList(true);
    } catch (error) {
      console.log('Erro ao buscar clientes', error);
    }
    setShowClientList(true);
  };

const selectCliente = (clienteId: string, clienteNome: string) => {
  setCarOwnerId(clienteId);
  setCarOwnerName(clienteNome);
  setShowClientList(false);
};

  const handleRegister = () => {
    if (!carBrand || !carModel || !carPlate || !carColor || !carKM || !carRenavam || !carYear || !carOwnerId) {
      window.alert('Informações faltantes');
      return; 
    } 
    novoCarro(); 
  };

  const filteredClientes = clientes.filter((cliente: any) =>
  cliente.nome.toLowerCase().includes(searchText.toLowerCase())
);

return (
  <Container>
    <TopBar>
  <BackButton onPress={() => navigation.navigate('Main', { screen: 'CarSearch' })}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </BackButton>
    </TopBar>

    <Title>Adicionar novo carro</Title>

    <InputFull
      placeholder="Marca do carro"
      value={carBrand}
      onChangeText={setCarBrand}
      placeholderTextColor="rgba(0, 0, 0, 0.5)"
    />

    <Row>
      <InputHalf
        placeholder="Modelo"
        value={carModel}
        onChangeText={setCarModel}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />
      <InputHalf
        placeholder="Ano"
        value={carYear}
        onChangeText={setCarYear}
        keyboardType="number-pad"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />
    </Row>

    <Row>
      <InputHalf
        placeholder="Cor"
        value={carColor}
        onChangeText={setCarColor}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />
      <InputHalf
        placeholder="Placa"
        value={carPlate}
        onChangeText={setCarPlate}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />
    </Row>

    <Row>
      <InputHalf
        placeholder="Renavam"
        value={carRenavam}
        onChangeText={setCarRenavam}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />
      <InputHalf
        placeholder="KM"
        value={carKM}
        onChangeText={setCarKM}
        keyboardType="decimal-pad"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />
    </Row>

    <Search>
      <InputOwner
        placeholder="Cliente"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={carOwnerName}
        editable={false}
        onChangeText={setCarOwnerName}
      />
      <SearchButton onPress={fetchClientes}>
        <Ionicons name="search" size={20} color="#000" />
      </SearchButton>
    </Search>

    <Modal visible={showClientList} transparent animationType="fade">
      <ModalOverlay onPress={() => setShowClientList(false)} />
      <ModalContent>
        <InputFull
          placeholder="Buscar cliente pelo nome..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        {filteredClientes.map((cliente: any, index) => (
          <ClientItem
            key={index}
            onPress={() => selectCliente(cliente.idusuario, cliente.nome)}
          >
            <ClientText>{cliente.nome}</ClientText>
          </ClientItem>
        ))}
      </ModalContent>
    </Modal>


    <BottomBar>
      <ButtonText onPress={handleRegister}>Adicionar</ButtonText>
    </BottomBar>

    <StatusBar style="auto" />
  </Container>
);
  }
  
  const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    height: 100%;
  `;
  
  const Title = styled.Text`
    font-size: ${width * 0.08}px;
    margin-bottom: ${height * 0.02}px;
    font-weight: bold;
  `;
  
  const ButtonText = styled.Text`
    color: #fff;
    font-size: ${width * 0.07}px;
    positions: center;
    font-weight : bold;
  `;

  const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  justify-content: center;
  padding-left: 10px;
`;

const BackButton = styled.TouchableOpacity``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${height * 0.02}px;
`;

const InputFull = styled.TextInput`
  height: ${height * 0.06}px;
  border: 2px solid #000;
  margin-bottom: ${height * 0.02}px;
  padding: 0 10px;
  width: 100%;
  border-radius: 5px;
`;

const InputHalf = styled.TextInput`
  height: ${height * 0.06}px;
  border: 2px solid #000;
  padding: 0 10px;
  width: 48%;
  border-radius: 5px;
`;

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

const InputOwner = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #000;
`;

const SearchButton = styled.TouchableOpacity`
  padding-left: 10px;
`;

const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  position: absolute;
  top: 30%;
  left: 10%;
  right: 10%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  elevation: 5;
`;

const ClientItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const ClientText = styled.Text`
  font-size: 16px;
`;
