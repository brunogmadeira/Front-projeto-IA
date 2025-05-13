import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idUser, setIdUser] =  useState<string | null>(null);
  const navigationDrawer = useNavigation<DrawerNavigationProp<any>>();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const idUser = await AsyncStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/carro/getuser/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;

        setName(user.nome);
        setEmail(user.email);
        setPhone(user.telefone_celular);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
    const funcao = async () => {
      setIdUser(idUser);
    }

      funcao();
      fetchUserData();

    }, []);

  return (
    <Container>
      <TopBar>
        <MenuButton onPress={() => navigationDrawer.toggleDrawer()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </MenuButton>
      </TopBar>

      <Content>
        <Avatar />
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
        <UserPhone>{phone}</UserPhone>
      </Content>

      <EditButton>
        <EditButtonText>Editar informações</EditButtonText>
      </EditButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  width: 100%;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  padding: 10px;
  justify-content: center;
`;

const MenuButton = styled.TouchableOpacity`
  padding-left: 10px;
`;

const Content = styled.View`
  margin-top: ${height * 0.15}px;
  align-items: center;
  width: 100%;
`;

const Avatar = styled.View`
  width: ${width * 0.4}px;
  height: ${width * 0.4}px;
  background-color: #ccc;
  border-radius: ${width * 0.2}px;
  margin-bottom: 20px;
`;

const UserName = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const UserEmail = styled.Text`
  font-size: 16px;
  color: blue;
  text-decoration: underline;
  margin-bottom: 10px;
`;

const UserPhone = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #000;
  padding: 20px;
  align-items: center;
`;

const EditButtonText = styled.Text`
    color: #fff;
    font-size: ${width * 0.07}px;
    positions: center;
    font-weight : bold;
`;
