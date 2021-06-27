import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title, Content } from './styles';
import { categories } from '../../utils/categories';

interface TransactionData {
  type: 'up' | 'down';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const dataKey = '@gofinance:transactions';

  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'down');

    const totalByCategory = [] as CategoryData[];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color,
        });
      }
    });

    setTotalByCategory(totalByCategory);
  }

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalByCategory.map(item => (
            <HistoryCard 
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }   
      </Content>
    </Container>
  );
}