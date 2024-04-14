import React from 'react';
import { GlobalProvider } from '../../context/GlobalState'
import { Balance } from '@/components/Balance';
import { Header } from '@/components/Header';
import LineChart from '@/components/LineChart';
import PieChart from '@/components/PieChart';

Balance
export default function Home() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Balance />
        <div className="container">
          <LineChart/>
          <PieChart/>
        </div>
      </GlobalProvider>

    </div>
  );
}
