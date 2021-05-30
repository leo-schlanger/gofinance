import React from 'react';

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

    </Container>
  );
}