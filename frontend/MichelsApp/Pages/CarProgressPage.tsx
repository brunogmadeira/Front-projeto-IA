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

export default function CarProgress() {

  const navigation = useNavigation<NavigationProp>();
  
  return (
    <Container>
      
      <TopBar>
        <BackButton onPress={() => navigation.navigate('CarSearch')}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </BackButton>
      </TopBar>

    </Container>
  );
}

const Container = styled.View`
flex: 1;
background-color: #fff;
align-items: center;
justify-content: top;
padding: 20px;
width: 100%;
height: 100%;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const BackButton = styled.TouchableOpacity``;