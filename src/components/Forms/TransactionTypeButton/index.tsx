import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({title, type, isActive, ...rest}: Props) {
  return(
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icon[type]} type={type}/>
      <Title>{title}</Title>
    </Container>
  );
}