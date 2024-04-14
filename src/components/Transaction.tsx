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
    isExpense: boolean;
  };
};

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign: string = transaction.isExpense ? '-' : '+';

  const handleDelete = async () => {
    deleteTransaction(transaction.id);
  };

  return (
    <li className={transaction.isExpense ? 'minus' : 'plus'}>
      <div>{transaction.text}</div>
      <div>{transaction.category.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ')
      }</div>
      <span>{sign}₹{Math.abs(transaction.amount)}</span>
      <button onClick={handleDelete} className="delete-btn">x</button>
    </li>
  );
};
