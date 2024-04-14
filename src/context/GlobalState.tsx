"use client"
import React, { createContext, useReducer, ReactNode } from 'react';
import AppReducer from './AppReducer';

type Transaction = {
  id: number;
  text: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
};

type State = {
  transactions: Transaction[];
  income: [];
  expenses: [];
  names: [];
  quantities: [];
};

type Action = {
  payload: Transaction[]
};

const initialState: State = {
  transactions: [],
  income: [],
  expenses: [],
  names: [],
  quantities: []
};

export const GlobalContext = createContext<{
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  fetchTransaction: () => void;
  fetchInsights: () => {};
}>({
  transactions: [],
  deleteTransaction: () => { },
  addTransaction: () => { },
  fetchTransaction: () => { },
  fetchInsights: () => ({}), // Return an empty object initially
});


const reducer = (state: State, action: Action): State => {
  return {
    ...state,
    transactions: action.payload,
  };
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteTransaction = async (id: number) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
      } else {
        throw new Error('Failed to delete transaction');
      }
    } catch (error) {
      console.error(error);
    }
    fetchTransaction()
  };

  const addTransaction = async (transaction: Transaction) => {
    try {
      const response = await fetch('api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error();
      }

      fetchTransaction()
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransaction = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data: Transaction[] = await response.json();
      dispatch({
        payload: data,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights');
      if (!response.ok) {
        throw new Error('Failed to fetch Insights');
      }
      const data = await response.json();
      return data; // Assuming data is already in the format of an object of arrays
    } catch (error) {
      console.error('Error fetching insights:', error);
      return {}; // Return an empty object if there's an error
    }
  };


  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        fetchTransaction,
        fetchInsights,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
