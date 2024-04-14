import React from 'react';
import { Header } from '../components/Header'
import { Balance } from '../components/Balance'
import { IncomeExpenses } from '../components/IncomeExpenses'
import { TransactionList } from '../components/TransactionList'
import { AddTransaction } from '../components/AddTransaction'
import { GlobalProvider } from '../context/GlobalState'
export default function Home() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <AddTransaction />
          <TransactionList showLatestThree/>
        </div>
      </GlobalProvider>

    </div>
  );
}
