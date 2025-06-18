import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, Platform, StatusBar as RNStatusBar, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); 

export default function Chatbot() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
        <Container>
          <TopBar>
            <MenuButton onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={24} color="#fff" />
            </MenuButton>
          </TopBar>
          <WebViewContainer>
            <WebView
              style={{ flex: 1 }}
              source={{ uri: 'https://n8n.srv853605.hstgr.cloud/webhook/bcf7f6ce-82a2-419b-8884-5c4dca2c8315/chat' }}
            />
          </WebViewContainer>
          <BottomBar>
          </BottomBar>
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
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

const WebViewContainer = styled.View`
  flex: 1;
  width: 100%;
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
