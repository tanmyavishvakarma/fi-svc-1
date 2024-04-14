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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          <label>Pie Chart</label>
          <Switch onChange={handleChange} checked={checked}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
          <label>Line Graph</label>
        </div>
        <div className="container">
          {checked ? <LineChart /> : <PieChart />}
        </div>
      </GlobalProvider>
    </div>
  );
}
