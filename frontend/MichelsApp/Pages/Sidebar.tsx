import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../Drawer/DrawerNavigation'; // Importe o tipo do Drawer

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// Use o DrawerParamList importado
type SidebarNavigationProp = DrawerNavigationProp<DrawerParamList>;

const Sidebar = ({ isOpen, onClose }: Props) => {
  const navigation = useNavigation<SidebarNavigationProp>();
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  if (!isOpen) return null;

  // Corrija a tipagem do parâmetro screen
  const navigateTo = (screen: keyof DrawerParamList) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Overlay onPress={onClose}>
      <AnimatedSidebar style={{ transform: [{ translateX: slideAnim }] }}>
        <MenuItem onPress={() => navigateTo('Chatbot')}>
          <MenuItemText>Chatbot</MenuItemText>
        </MenuItem>
        <MenuItem onPress={() => navigateTo('CarSearch')}>
          <MenuItemText>Buscar Carros</MenuItemText>
        </MenuItem>
        <MenuItem onPress={() => navigateTo('Profile')}>
          <MenuItemText>Perfil</MenuItemText>
        </MenuItem>
      </AnimatedSidebar>
    </Overlay>
  );
};

// Estilos mantidos iguais
const Overlay = styled(TouchableWithoutFeedback)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AnimatedSidebar = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #222;
  padding: 20px;
  z-index: 100;
`;

const MenuItem = styled(TouchableOpacity)`
  padding: 15px 0;
`;

const MenuItemText = styled.Text`
  color: white;
  font-size: 18px;
`;

export default Sidebar;