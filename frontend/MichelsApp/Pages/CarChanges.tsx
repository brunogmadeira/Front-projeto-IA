import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarChanges'>;

export default function CarChanges(props: any) {
    
    const [orcamentoValor, setOrcamentoValor] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      try {
        setLoading(true);
        
        if (!orcamentoValor || !info) {
          alert('Preencha todos os campos!');
          return;
        }

        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');
        
        if (!token || !userId) {
          alert('Usuário não autenticado!');
          return;
        }

        const payload = {
          idcarro: idcar,
          iduser: parseInt(userId),
          valor: parseFloat(orcamentoValor),
          info: info,
          status: "Pendente", 
          tipo: "Orçamento" 
        };

        const response = await axios.post('http://localhost:8080/api/servico/addneworc', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          alert('Orçamento adicionado com sucesso!');
          navigation.navigate('CarProgress', { idcar: idcar });
        }
      } catch (error) {
        console.error('Erro ao adicionar orçamento:', error);
        alert('Erro ao adicionar orçamento');
      } finally {
        setLoading(false);
      }
    };


    const navigation = useNavigation<NavigationProp>();
    const idcar = props?.route?.params.idcar;
    return (
      <Container>
      <TopBar>
        <BackButton onPress={() => navigation.navigate('CarProgress', { idcar: idcar })}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </BackButton>
      </TopBar>
        <Title>Alterações do carro</Title>
  
      <Input
        placeholder="Orçamento"
        keyboardType="decimal-pad"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={orcamentoValor}
        onChangeText={setOrcamentoValor}
      />

      <BigInput
        placeholder="Informações"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={info}
        onChangeText={setInfo}
      />

      <BottomBar onPress={handleSubmit}>
        <ButtonText>{loading ? 'Enviando...' : 'Alterar'}</ButtonText>
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

  const BigInput = styled.TextInput.attrs({
    multiline: true,
    textAlignVertical: 'top',
  })`
    height: ${height * 0.20}px;
    border: 2px solid #000;
    margin-bottom: ${height * 0.02}px;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
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

const BottomBar = styled.TouchableOpacity`
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