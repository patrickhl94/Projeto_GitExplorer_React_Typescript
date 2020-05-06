import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import Header from '../../components/Header';

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

  function formatDate(date: string): string {
    const dateFormatDate = parseISO(date);
    return format(dateFormatDate, 'dd/MM/yyyy');
  }

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const { balance: balanc, transactions: transact } = response.data;

      const formatedValuesTransactions = transact.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: formatDate(transaction.created_at.toString()),
        }),
      );
      setTransactions(formatedValuesTransactions);

      const formatedBalance = {
        income: formatValue(balanc.income),
        outcome: formatValue(balanc.outcome),
        total: formatValue(balanc.total),
      };
      setBalance(formatedBalance);
    }

    loadTransactions();
  }, []);

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
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
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
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
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
