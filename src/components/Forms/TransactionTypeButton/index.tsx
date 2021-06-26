import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title, Icon, Button } from './styles';

interface Props extends RectButtonProps {
  name: string;
  type: "up" | "down";
  isActive: boolean;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({name, type, isActive, ...rest}: Props) {
  return(
    <Container type={type} isActive={isActive}>
      <Button  {...rest}>
        <Icon name={icon[type]} type={type}/>
        <Title>{name}</Title>
      </Button>
    </Container>
  );
}