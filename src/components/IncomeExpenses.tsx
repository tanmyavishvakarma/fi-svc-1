"use client"

import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Link from 'next/link'; // Import Link from next/link

export const IncomeExpenses: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts: number[] = transactions.map(transaction => transaction.amount);

  const income: string = transactions
    .filter(item => !item.isExpense)
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);

  const expense: string = (
    transactions.filter(item => item.isExpense).reduce((acc, item) => (acc += item.amount), 0)
  ).toFixed(2);

  return (
    <div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{expense}</p>
        </div>
      </div>
      <div className='amount-div'>
        <Link href='/history'>
          <button className="btn">View History</button>
        </Link>

        <Link href='/insight'>
          <button className="btn">View Insight</button>
        </Link>
      </div>
    </div>
  );
};
