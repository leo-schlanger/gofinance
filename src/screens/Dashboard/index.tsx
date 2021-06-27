import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
  LoaderContainer,
} from './styles';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardProps {
  id: string,
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const dataKey = '@gofinance:transactions';
  const theme = useTheme();
 
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    },[])
  );

  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'up' | 'down',
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math, 
        collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      {
        month: 'long'
      }
    )}`
  }

  async function loadTransactions() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if(item.type === 'up') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'up');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'down');
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval,
      }
    })

    setIsLoading(false);
  }

  return (
    <Container>
      {
        isLoading ? 
          <LoaderContainer>
            <ActivityIndicator 
              color={theme.colors.primary}
              size="large"
            />
          </LoaderContainer> :
        <>
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
            amount={highLightData.entries.amount}
            lastTransaction={highLightData.entries.lastTransaction}
          />
          <HighlightCard
            type="down"
            title="Saídas"
            amount={highLightData.expensives.amount}
            lastTransaction={highLightData.expensives.lastTransaction}
          />
          <HighlightCard
            type="total"
            title="Total"
            amount={highLightData.total.amount}
            lastTransaction={highLightData.total.lastTransaction}
          />
        </HighlightCards>
      
        <Transactions>
          <Title>Listagem</Title>

          <TransactionList 
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({item}) => (<TransactionCard data={item}/>)}
          />
        </Transactions>
      </>
      }
    </Container>
  );
}