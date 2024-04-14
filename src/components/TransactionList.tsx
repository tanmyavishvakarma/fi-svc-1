"use client"

import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList: React.FC = () => {
  const { transactions, fetchTransaction } = useContext(GlobalContext);
  useEffect(()=>{
    fetchTransaction()
  },[])

  return (
    <>
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
