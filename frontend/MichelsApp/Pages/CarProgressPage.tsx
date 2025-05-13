import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
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
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [servicos, setServicos] = React.useState<any[]>([]);
  const [selectedServico, setSelectedServico] = React.useState<any>(null);
  const [showServiceModal, setShowServiceModal] = React.useState(false);

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
          setServicos(response.data);
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

    const carregarTipoUsuario = async () => {
      try {
        const tipo = await AsyncStorage.getItem('userTipo');
        setTipoUsuario(tipo);
      } catch (error) {
        console.error('Erro ao carregar tipo do usuário:', error);
      }
    };

    fetchOrcamento();
    carregarTipoUsuario();
  }, [idcar]);

  const handleUpdateStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      setError('Usuário não autenticado');
      return;
    }

    let updatedServico;
    if (selectedServico.tipo === 'Orçamento' && selectedServico.status === 'Pendente') {
      updatedServico = {
        ...selectedServico,
        status: 'Em andamento'
      };
    } else if (selectedServico.status === 'Em andamento') {
      updatedServico = {
        ...selectedServico,
        status: 'Finalizado'
      };
    } else {
      return; // Não faz nada se não estiver em estado válido
    }

    await axios.put('http://localhost:8080/api/servico/attorc', updatedServico, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setServicos(prev => prev.map(s => s.id === updatedServico.id ? updatedServico : s));
    setShowServiceModal(false);
  } catch (err) {
    setError('Erro ao atualizar o status');
    console.error(err);
  }
};

  const total = servicos.reduce((acc, curr) => acc + (curr.valor || 0), 0);
  const emAberto = servicos.reduce((acc, curr) => 
    curr.status !== 'Finalizado' ? acc + (curr.valor || 0) : acc, 0
  );
  const fechado = servicos.reduce((acc, curr) => 
    curr.status === 'Finalizado' ? acc + (curr.valor || 0) : acc, 0
  );
  
  return (
    <Container>
      <TopBar>
        <BackButton onPress={() => navigation.navigate('Main', { screen: 'CarSearch' })}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </BackButton>
        
        {tipoUsuario === '1' && (
          <AddButton onPress={() => navigation.navigate('CarChanges', { idcar: idcar })}>
            <Ionicons name="add" size={26} color="#fff" />
          </AddButton>
        )}
      </TopBar>

      <TotalContainer>
        <TotalText>Total de Serviços: {servicos.length}</TotalText>
        <TotalText>Valor Total: R$ {total.toFixed(2)}</TotalText>
        <TotalText>Valor em Aberto: R$ {emAberto.toFixed(2)}</TotalText>
        <TotalText>Valor Fechado: R$ {fechado.toFixed(2)}</TotalText>
      </TotalContainer>

      <TimelineList>
        {servicos.map((servico: any, index: number) => (
          <TimelineCard 
            key={index} 
            onPress={() => {
              setSelectedServico(servico);
              setShowServiceModal(true);
            }}
          >
            <TimelineText>
              {servico.tipo} - Número {servico.id} 
            </TimelineText>
            <TimelineText>Data: {new Date(servico.dataServico).toLocaleDateString('pt-BR')}
</TimelineText>
          </TimelineCard>
        ))}
      </TimelineList>

      {showServiceModal && selectedServico && (
        <ModalOverlay>
          <ModalBox>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              <ModalText>Tipo: {selectedServico.tipo}</ModalText>
              <ModalText>Valor: R$ {Number(selectedServico.valor).toFixed(2)}</ModalText>
              <ModalText>Status: {selectedServico.status}</ModalText>
              {selectedServico.info && <ModalText>Informações: {selectedServico.info}</ModalText>}
            </ScrollView>
            
      <ModalActions>
        {tipoUsuario === '1' && (
          <>
            {(selectedServico.tipo === 'Orçamento' && selectedServico.status === 'Pendente') && (
              <ModalButton onPress={handleUpdateStatus}>
                <ModalButtonText>Iniciar Serviço</ModalButtonText>
              </ModalButton>
            )}
            
            {(selectedServico.status === 'Em andamento') && (
              <ModalButton onPress={handleUpdateStatus}>
                <ModalButtonText>Finalizar Serviço</ModalButtonText>
              </ModalButton>
            )}
          </>
        )}
        
        <ModalButton cancel onPress={() => setShowServiceModal(false)}>
          <ModalButtonText>Fechar</ModalButtonText>
        </ModalButton>
      </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

{/*       {tipoUsuario === '1' && ( 
        <BottomBar onPress={() => setShowModal(true)}>
          <ButtonText>Finalizar serviço</ButtonText>
        </BottomBar>
      )} */}
    </Container>
  );
}

// Estilos atualizados
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

const TimelineList = styled.View`
  width: 100%;
  padding: 0 20px;
`;

const TimelineCard = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const TimelineText = styled.Text`
  font-size: 20px;
`;

const BottomBar = styled.TouchableOpacity`
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
  font-weight: bold;
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
  max-height: ${height * 0.7}px;
`;

const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ModalActions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
`;

const ModalButton = styled.TouchableOpacity<{ cancel?: boolean }>`
  padding: 10px 20px;
  background-color: ${(props: { cancel?: boolean }) => props.cancel ? '#999' : '#000'};
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
  margin: 2px 0;
`;