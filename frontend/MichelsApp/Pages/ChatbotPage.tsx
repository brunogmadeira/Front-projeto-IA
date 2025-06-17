import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window'); 

export default function Chatbot() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) : 0 }}>
      <Container>
        <TopBar>
          <MenuButton onPress={() => navigation.toggleDrawer()}>
            <Ionicons name="menu" size={24} color="#fff" />
          </MenuButton>
        </TopBar>
        <Content />
        <BottomBar>
          <SendButton>
            <Ionicons name="send" size={20} color="#fff" />
          </SendButton>
        </BottomBar>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TopBar = styled.View`
  width: 100%;
  height: ${height * 0.06}px;
  background-color: #000;
  justify-content: center;
  padding-left: 10px;
`;

const MenuButton = styled.TouchableOpacity``;

const Content = styled.View`
  flex: 1;
`;

const BottomBar = styled.View`
  width: 100%;
  height: ${height * 0.06}px;
  background-color: #000;
  justify-content: center;
  align-items: flex-end;
  padding-right: 10px;
`;

const SendButton = styled.TouchableOpacity``;
