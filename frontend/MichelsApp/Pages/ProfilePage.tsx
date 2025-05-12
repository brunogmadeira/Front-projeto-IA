import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigationDrawer = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Container>
      <TopBar>
        <MenuButton onPress={() => navigationDrawer.toggleDrawer()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </MenuButton>
      </TopBar>

      <Content>
        <Avatar />
        <UserName>Fulano de tal</UserName>
        <UserEmail>fulano@gmail.com</UserEmail>
        <UserPhone>(99)999999999</UserPhone>
        <UserDoc>CPF/CNPJ</UserDoc>
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

const UserDoc = styled.Text`
  font-size: 16px;
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
