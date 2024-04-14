"use client"
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance: React.FC = () => {
    const { transactions, fetchTransaction } = useContext(GlobalContext);

    useEffect(() => {
        fetchTransaction()
    }, [])

    const amounts: number[] = transactions.map(transaction => transaction.amount);

    const total: string = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>₹{total}</h1>
        </>
    );
};
