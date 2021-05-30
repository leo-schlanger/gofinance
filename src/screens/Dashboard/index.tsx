import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/37229572?s=400&u=c582816450d7548ede93d47f6c9affddf0aa2bdc&v=4'}} />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Leo Schlanger</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />   
        </UserWrapper>   
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada feita 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1259,00"
          lastTransaction="Ultima saida feita 06 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 05 de abril"
        />
      </HighlightCards>
    </Container>
  );
}