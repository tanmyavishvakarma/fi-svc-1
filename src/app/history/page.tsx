import React from 'react';
import { GlobalProvider } from '../../context/GlobalState'
import { Balance } from '@/components/Balance';
import { Header } from '@/components/Header';
import { TransactionList } from '@/components/TransactionList';

export default function Home() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Balance />
        <div className="container">
          <TransactionList />
        </div>
      </GlobalProvider>

    </div>
  );
}
