import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarSearch'>;

export default function CarRegister() {
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carPlate, setCarPlate] = useState('');
    const [carRenavam, setCarRenavam] = useState('');
    const [carKM, setCarKM] = useState('');
    const [carOwner, setCarOwner] = useState('');
    
    const navigation = useNavigation<NavigationProp>();

    const onClienteSearchPress = () => {
      console.log('Busca de cliente (placeholder)');
    };

return (
  <Container>
    <TopBar>
      <BackButton onPress={() => navigation.navigate('CarSearch')}>
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
      />
      <SearchButton onPress={onClienteSearchPress}>
        <Ionicons name="search" size={20} color="#000" />
      </SearchButton>
    </Search>


    <BottomBar>
      <ButtonText>Adicionar</ButtonText>
    </BottomBar>

    <StatusBar style="auto" />
  </Container>
);
  }
  // ao clicar em entrar, verificar se alguma info não ta errada pra ai sim permitir continuAR 
  
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
  
  const Input = styled.TextInput`
    height: ${height * 0.06}px;
    border: 2px solid #000;
    margin-bottom: ${height * 0.02}px;
    padding: 0 10px;
    width: 100%;
    border-radius: 5px;
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
