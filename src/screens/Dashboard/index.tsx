import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string,
}

export function Dashboard() {
  const data: DataListProps[] =[
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 58,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "13/04/2020",
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "13/04/2020",
    }
  ];

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

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />   
          </LogoutButton>

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
    
      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (<TransactionCard data={item}/>)}
        />
      </Transactions>
    </Container>
  );
}