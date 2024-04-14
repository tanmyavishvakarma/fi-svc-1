import React from 'react';
import {Header} from '../components/Header'
import{Balance} from '../components/Balance'
import {IncomeExpenses} from '../components/IncomeExpenses'
import {TransactionList} from '../components/TransactionList'
import{AddTransaction} from '../components/AddTransaction'
import{GlobalProvider} from '../context/GlobalState'
import LineChart from '../components/LineChart'
export default function Home() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <AddTransaction />
          <TransactionList />
          <LineChart/>
        </div>
      </GlobalProvider>
      
    </div>
  );
}
