import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';

import { 
  Container, 
  Header, 
  Title, 
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButtom,
  SelectIcon,
  Month,
  LoaderContainer,
} from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

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
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

export function Resume() {
  const dataKey = '@gofinance:transactions';
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    },[selectedDate])
  );

  async function loadData() {
    setIsLoading(true);

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => 
      expensive.type === 'down' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
    );

    const expensivesTotal = expensives
    .reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory = [] as CategoryData[];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = (categorySum / expensivesTotal * 100)
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percent,
          percentFormatted,
        });
      }
    });

    setTotalByCategory(totalByCategory);

    setIsLoading(false);
  }

  function handleDateChange(action: 'next' | 'prev') {
    if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  return(
    <Container>

      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
        isLoading ? 
          <LoaderContainer>
            <ActivityIndicator 
              color={theme.colors.primary}
              size="large"
            />
          </LoaderContainer> :
        <>
          <MonthSelect>
            <MonthSelectButtom onPress={() => handleDateChange('prev')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButtom>

            <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

            <MonthSelectButtom onPress={() => handleDateChange('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButtom>
          </MonthSelect>

          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <ChartContainer>
              <VictoryPie 
                data={totalByCategory}
                colorScale={totalByCategory.map(category => category.color)}
                style={{
                  labels: { 
                    fontSize: RFValue(18),
                    fontWeight:'bold', 
                    fill: theme.colors.shape,
                  }
                }}
                labelRadius={50}
                x="percentFormatted"
                y="total"
              />
            </ChartContainer>

            {
              totalByCategory.map(item => (
                <HistoryCard 
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />
              ))
            }   
          </Content>
        </>
      }
    </Container>
  );
}