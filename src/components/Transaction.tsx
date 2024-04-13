"use client"
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

type TransactionProps = {
  transaction: {
    id: number;
    text: string;
    amount: number;
    category: string;
    date: string;
  };
};

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign: string = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div>{transaction.text}</div>
      <div>{transaction.category.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ')
      }</div>
      <span>{sign}${Math.abs(transaction.amount)}</span>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
  );
};
