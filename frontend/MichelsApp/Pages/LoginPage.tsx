import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

//como pegar token
//const token = await AsyncStorage.getItem('userToken');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp>();
  
  const login = async () => {
    try {
      const response = await axios.post(`https://back-projeto-ia-production.up.railway.app/auth/login`, {
        username: email,     
        password: password
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userId', response.data.id);
        await AsyncStorage.setItem('userTipo', response.data.tipo_usuario);
      navigation.navigate('Main', { screen: 'Chatbot' });
      } else {
        console.log('Erro ao realizar login');
      }
    } catch (error: any) {
       Alert.alert(error.response.data);  
    }
  };
  
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    login();
  };

  return (
    <Container>
      <ImageLogo source={require('../assets/michelslogocorrigido.jpeg')} resizeMode="contain" />

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor='rgba(0, 0, 0, 0.5)'
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor='rgba(0, 0, 0, 0.5)'
      />

      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>


        <Suggestion>
          Não possui conta ainda? 
          <RegisterSuggestion onPress={() => navigation.navigate('Register')}>
             Cadastre-se
          </RegisterSuggestion>
        </Suggestion>

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

const Suggestion = styled.Text`
  font-size: ${width * 0.04}px;
  margin-top: ${height * 0.02}px;
  align-items: center;
  justify-content: center;
`;

const RegisterSuggestion = styled.Text`
  font-size: ${width * 0.04}px;
  color: #1e90ff;
  text-decoration: underline;
  padding: 2px;
`;

const Input = styled.TextInput`
  height: ${height * 0.06}px;
  border: 2px solid #000;
  margin-bottom: ${height * 0.02}px;
  padding: 0 10px;
  width: 100%;
  border-radius: 5px;
`;

const Button = styled.TouchableOpacity`
  background-color: #000;
  padding: ${height * 0.02}px;
  align-items: center;
  border-radius: 5px;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: ${width * 0.05}px;
`;

const ImageLogo = styled.Image`
  width: ${width * 0.8}px;
  height: ${height * 0.3}px;
  margin-bottom: ${height * 0.03}px;
`;
