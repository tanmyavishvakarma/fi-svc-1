"use client"

import React, { useState } from 'react';
import { GlobalProvider } from '../../context/GlobalState';
import { Balance } from '@/components/Balance';
import { Header } from '@/components/Header';
import LineChart from '@/components/LineChart';
import PieChart from '@/components/PieChart';
import Switch from "react-switch";
export default function Home() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Balance />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth:"40vw" }}>
          <h2>Explore insights into your expenditures.</h2>
        </div>
        <PieChart />
        <br></br>
        <hr></hr>
        <LineChart />
      </GlobalProvider>
    </div>
  );
}
