"use client"
import React, { createContext, useReducer, ReactNode } from 'react';
import AppReducer from './AppReducer';

// Define types
type Transaction = {
  id: number;
  text: string;
  amount: number;
  category:string;
  date:string;
};

type State = {
  transactions: Transaction[];
};

type Action =
  | { type: 'DELETE_TRANSACTION'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction };

// Initial state
const initialState: State = {
  transactions: [],
};

// Create context
export const GlobalContext = createContext<{ transactions: Transaction[]; deleteTransaction: (id: number) => void; addTransaction: (transaction: Transaction) => void }>({
  transactions: [],
  deleteTransaction: () => {},
  addTransaction: () => {},
});

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

// Provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const deleteTransaction = (id: number) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  };

  const addTransaction = (transaction: Transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
