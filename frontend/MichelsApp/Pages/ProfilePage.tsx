import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView } from 'react-native';
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
  const [cpf, setCpf] = useState('');
  const [carrosEmServico, setCarrosEmServico] = useState<any[]>([]);
  const navigationDrawer = useNavigation<DrawerNavigationProp<any>>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const idUser = await AsyncStorage.getItem('userId');

        if (!idUser || !token) {
          console.error('Usuário não autenticado');
          return;
        }

        const response = await axios.get(`https://back-projeto-ia-production.up.railway.app/api/carro/getuser/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;

        setName(user.nome);
        setEmail(user.email);
        setPhone(user.telefone_celular);
        setCpf(user.cpf_cnpj || 'Não informado');

        const carsResponse = await axios.get(`https://back-projeto-ia-production.up.railway.app/api/carro/getall/bycliente/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cars = carsResponse.data;
        const carsWithService = [];

        if (cars && cars.length > 0) {
          for (const car of cars) {
            const servicesResponse = await axios.get(`https://back-projeto-ia-production.up.railway.app/api/servico/getbycar/${car.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const services = servicesResponse.data;
            const orcamento = services.find((s: any) => s.status !== 'Finalizado');

            if (orcamento) {
              carsWithService.push({
                placa: car.placa,
                modelo: car.modelo,
                ano: car.ano,
                descricao_orcamento: orcamento.info || 'Descrição não disponível',
              });
            }
          }
        }
        setCarrosEmServico(carsWithService);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) : 0 }}>
      <Container>
        <TopBar>
          <MenuButton onPress={() => navigationDrawer.toggleDrawer()}>
            <Ionicons name="menu" size={26} color="#fff" />
          </MenuButton>
        </TopBar>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

          <AvatarContainer>
            <Ionicons name="person" size={width * 0.2} color="#fff" />
          </AvatarContainer>

          <UserName>{name}</UserName>
          <UserEmail>{email}</UserEmail>
          <UserPhone>{phone}</UserPhone>
          <UserCPF>CPF/CNPJ: {cpf}</UserCPF>

          {carrosEmServico.length > 0 ? (
            carrosEmServico.map((carro, index) => (
              <CarInfoCard key={index}>
                <CarInfoText>Placa: {carro.placa}</CarInfoText>
                <CarInfoText>Modelo: {carro.modelo}</CarInfoText>
                <CarInfoText>Ano: {carro.ano}</CarInfoText>
                <CarInfoText>Orçamento: {carro.descricao_orcamento}</CarInfoText>
              </CarInfoCard>
            ))
          ) : (
            <CarInfoCard>
              <NoCarText>Nenhum carro em serviço</NoCarText>
            </CarInfoCard>
          )}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  width: 100%;
`;

const TopBar = styled.View`
  width: 100%;
  height: ${height * 0.08}px;
  background-color: #000;
  padding: 10px;
  justify-content: center;
`;

const MenuButton = styled.TouchableOpacity`
  padding-left: 10px;
`;

const AvatarContainer = styled.View`
  width: ${width * 0.4}px;
  height: ${width * 0.4}px;
  border-radius: ${width * 0.2}px;
  background-color: #ccc;
  justify-content: center;
  align-items: center;
  margin-top: ${height * 0.05}px;
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

const UserCPF = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
`;

const CarInfoCard = styled.View`
  width: 350px;
  border: 1px solid #000;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  justify-content: center;
  align-self: center;
`;

const CarInfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const NoCarText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #888;
`;
