import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { FiChevronDown } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const { balance: balanc, transactions: transact } = response.data;
      setBalance(balanc);
      setTransactions(transact);
    }

    loadTransactions();
  }, []);

  function convertValue(value: number): string {
    const valueConverted = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value));

    return valueConverted;
  }

  function formatDate(date: string): string {
    const dateFormatDate = parseISO(date);
    return format(dateFormatDate, 'dd/MM/yyyy');
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {convertValue(Number(balance.income) || 0)}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {convertValue(Number(balance.outcome) || 0)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {convertValue(Number(balance.total) || 0)}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>
                  Título
                  <FiChevronDown size={18} />
                </th>
                <th>
                  Preço
                  <FiChevronDown size={18} />
                </th>
                <th>
                  Categoria
                  <FiChevronDown size={18} />
                </th>
                <th>
                  Data
                  <FiChevronDown size={18} />
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'income' ? '' : '- '}
                    {convertValue(Number(transaction.value))}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{formatDate(transaction.created_at.toString())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
