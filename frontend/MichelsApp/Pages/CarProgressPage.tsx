import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarProgress'>;




export default function CarProgress(props: any) {
    const navigation = useNavigation<NavigationProp>();
  const idcar = props?.route?.params.idcar;
  const [showModal, setShowModal] = React.useState(false);
  const [orcamento, setOrcamento] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [servicos, setServicos] = React.useState<any[]>([]);



  React.useEffect(() => {
  const fetchOrcamento = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('Usuário não autenticado');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/servico/getbycar/${idcar}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.data && response.data.length > 0) {
      setServicos(response.data); // Armazena todos os serviços
    } else {
      setError('Nenhum serviço encontrado');
    }
    } catch (err) {
      setError('Erro ao buscar dados do orçamento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrcamento();
}, [idcar]);




  return (
    <Container>
      <TopBar>
        <BackButton onPress={() => navigation.navigate('Main', { screen: 'CarSearch' })}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </BackButton>
        
        <AddButton onPress={() => navigation.navigate('CarChanges', { idcar: servicos[0]?.idcarro })}>
          <Ionicons name="add" size={26} color="#fff" />
        </AddButton>
      </TopBar>

      <TotalContainer>
        <TotalText>
          Total de Serviços: {servicos.length}
        </TotalText>
        <TotalText>
          Valor Total: R$ {
            servicos.reduce((acc, curr) => acc + (curr.valor || 0), 0).toFixed(2)
          }
        </TotalText>
      </TotalContainer>

      <TimelineList>
        {servicos.map((servico: any, index: number) => (
          <TimelineCard key={index}>
            <TimelineText>
              {servico.tipo} - R$ {servico.valor}
            </TimelineText>
            <TimelineText>Status: {servico.status}</TimelineText>
            {servico.info && <TimelineText>Info: {servico.info}</TimelineText>}
          </TimelineCard>
        ))}
      </TimelineList>

      {/* {showModal && (
  <ModalOverlay>
    <ModalBox>
      <ModalText>Tem certeza que deseja finalizar o serviço?</ModalText>
      <ModalActions>
        <ModalButton onPress={() => {
          setShowModal(false);
          // Ação real de finalização do serviço viria aqui
        }}>
          <ModalButtonText>Sim</ModalButtonText>
        </ModalButton>
        <ModalButton onPress={() => setShowModal(false)} cancel>
          <ModalButtonText>Cancelar</ModalButtonText>
        </ModalButton>
      </ModalActions>
    </ModalBox>
  </ModalOverlay>
)} */}

    
<BottomBar onPress={() => setShowModal(true)}>
  <ButtonText>Finalizar serviço</ButtonText>
</BottomBar>


      
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding-top: ${height * 0.1}px;
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

const AddButton = styled.TouchableOpacity``;

const TitleArea = styled.View`
  margin-bottom: ${height * 0.04}px;
`;

const TimelineList = styled.View`
  width: 100%;
  padding: 0 20px;
`;

const TimelineCard = styled.View`
  width: 100%;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const TimelineText = styled.Text`
  font-size: 20px;
`;

const InfoText = styled.Text`
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`;

const BottomBar = styled.View`
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

const ButtonText = styled.Text`
  color: #fff;
  font-size: ${width * 0.07}px;
  positions: center;
  font-weight : bold;
`;

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.View`
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  elevation: 5;
`;

const ModalText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

const ModalActions = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ModalButton = styled.TouchableOpacity<{ cancel?: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
`;

const ModalButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const TotalContainer = styled.View`
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
`;

const TotalText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
`;