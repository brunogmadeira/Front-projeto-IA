import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay onPress={onClose}>
      <AnimatedSidebar style={{ transform: [{ translateX: slideAnim }] }}>
        <MenuItem>Home</MenuItem>
        <MenuItem>Perfil</MenuItem>
        <MenuItem>Configurações</MenuItem>
      </AnimatedSidebar>
    </Overlay>
  );
};

export default Sidebar;

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
  width: ${SIDEBAR_WIDTH}px;
  background-color: #222;
  padding: 20px;
`;

const MenuItem = styled.Text`
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
`;
