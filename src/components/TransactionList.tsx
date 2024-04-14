"use client"
import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';
import Link from 'next/link';

interface TransactionListProps {
  showLatestThree?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ showLatestThree = false }) => {
  const { transactions } = useContext(GlobalContext);

  let displayedTransactions = transactions;

  if (showLatestThree) {
    displayedTransactions = transactions.slice(0, 3);
  }

  return (
    <>
      <h3>Transaction History</h3>
      {
        transactions.length === 0 ?
          <div>No Records Found. Please Add a Transaction.</div>
          :
          <div>
            <ul className="list">
              {displayedTransactions.map(transaction => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
            <div style={{ fontSize: "15px" }}>
              {showLatestThree ?
                <h5>To View All
                  <Link href='/history'>
                    <button style={{ width: "30%" }} className="btn">View History</button>
                  </Link>
                </h5>
                :
                <h5>Hover On Transaction to Delete</h5>
              }
            </div>
          </div>
      }
    </>
  );
};
