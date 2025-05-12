import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarProgress'>;

export default function CarProgress() {
  const navigation = useNavigation<NavigationProp>();
  const [showModal, setShowModal] = React.useState(false);

  const valorOrcamento = 'R$ 3.500,00';
  const alteracoesTexto = 'Troca de peças e pintura lateral.';

  return (
    <Container>
      <TopBar>
        <BackButton onPress={() => navigation.navigate('Main', { screen: 'CarSearch' })}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </BackButton>
        <AddButton onPress={() => navigation.navigate('CarChanges')}>
          <Ionicons name="add" size={26} color="#fff" />
        </AddButton>
      </TopBar>

      <TitleArea>
        <InfoText>ORÇAMENTO: {valorOrcamento}</InfoText>
        <InfoText>ALTERAÇÕES: {alteracoesTexto}</InfoText>
      </TitleArea>

      <TimelineList>
        {[1, 2, 3, 4].map((item, index) => (
          <TimelineCard key={index}>
            <TimelineText>01/01/1900</TimelineText>
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
