import React from 'react';
import { categories } from '../../utils/categories';
import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardProps {
  type: 'up' | 'down';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function TransactionCard ({data}: Props) {
  const {type, name, amount, category: categoryKey, date} = data;
  
  const category = categories.filter(item => item.key === categoryKey)[0];

  return(
    <Container >
      <Title>{name}</Title>
      <Amount type={type}>{type === "down" && '- '}{amount}</Amount>

      <Footer>
        <Category>
          <Icon name={category.icon}/>
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};