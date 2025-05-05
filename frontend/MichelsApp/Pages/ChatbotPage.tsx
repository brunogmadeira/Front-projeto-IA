import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

const { width, height } = Dimensions.get('window'); 

export default function Chatbot() {

  const navigation = useNavigation<DrawerNavigationProp<any>>();
  
  return (
    <Container>
      <TopBar>
        <MenuButton onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="#fff" />
        </MenuButton>
      </TopBar>

      <BottomBar>
        <SendButton>
          <Ionicons name="send" size={20} color="#fff" />
        </SendButton>
      </BottomBar>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height * 0.06}px;
  background-color: #000;
  justify-content: center;
  padding-left: 10px;
`;

const MenuButton = styled.TouchableOpacity``;

const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: ${height * 0.06}px;
  background-color: #000;
  justify-content: center;
  align-items: flex-end;
  padding-right: 10px;
`;

const SendButton = styled.TouchableOpacity``;
