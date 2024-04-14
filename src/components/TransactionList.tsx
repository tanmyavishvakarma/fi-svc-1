"use client"

import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>Transaction History</h3>
      {
        transactions.length == 0 ?
          <div>No Records Found Please Add a Transaction</div>
          :
          <div>
            <ul className="list">
              {transactions.map(transaction => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
            <div style={{ fontSize: "15px" }}>Hover On Transaction to Delete</div>
          </div>

      }

    </>
  );
};
