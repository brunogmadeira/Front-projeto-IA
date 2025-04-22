import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  const navigation = useNavigation<NavigationProp>();

  const passwordMatch = (senha: string, confirmarSenha: string): boolean => {
    return senha === confirmarSenha;
  };

  //EM NAVEGADOR NÃO VAI FUNCIONAR 
  // const showAlert = (title: string, message: string) => {
  //   if (typeof window !== 'undefined') {
  //     // Web
  //     window.alert(`${title}\n${message}`);
  //   } else {
  //     // Mobile
  //     Alert.alert(title, message);
  //   }
  // };
  
  const handleRegister = () => {
    if (!fullName || !email || !phone || !password || !matchPassword) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    if (!passwordMatch(password, matchPassword)) {
      Alert.alert('Erro', 'As senhas não conferem!');
      return;
    }
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Title>Cadastro</Title>

      <Input
        placeholder="Nome completo"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      <Input
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      <Input
        placeholder="Confirmar senha"
        value={matchPassword}
        onChangeText={setMatchPassword}
        secureTextEntry
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      <Button onPress={handleRegister}>
        <ButtonText>Entrar</ButtonText>
      </Button>

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
