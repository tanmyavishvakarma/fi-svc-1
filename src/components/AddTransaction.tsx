"use client"
import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { GlobalContext } from '../context/GlobalState';

interface Transaction {
  id: number;
  text: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
};

interface FormState {
  text: string;
  amount: number;
  category: string;
  date: string;
  isExpense: boolean;
}

export const AddTransaction: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    text: '',
    amount: 0,
    category: '',
    date: '',
    isExpense: true,
  });

  const [amountError, setAmountError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [textError, setTextError] = useState<string>('');

  const financialCategories: string[] = ["Rent", "Food", "Travel", "Utilities", "Entertainment", "Healthcare", "Insurance", "Savings", "Debt", "Other"];

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (formData.amount === 0) {
      setAmountError("Please enter a valid amount.");
      hasError = true;
    } else {
      setAmountError('');
    }

    if (formData.text.trim() === '') {
      setTextError("Please enter a description.");
      hasError = true;
    } else {
      setTextError('');
    }

    if (formData.category === '') {
      setCategoryError("Please select a category.");
      hasError = true;
    } else {
      setCategoryError('');
    }

    if (formData.date === '') {
      setDateError("Please select a date.");
      hasError = true;
    } else {
      setDateError('');
    }

    if (!hasError) {
      const signedAmount = formData.isExpense ? -Math.abs(formData.amount) : Math.abs(formData.amount);

      const newTransaction: Transaction = {
        id: Math.floor(Math.random() * 100000000),
        text: formData.text,
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
        isExpense: formData.isExpense
      };

      addTransaction(newTransaction);
      setFormData({
        text: '',
        amount: 0,
        category: '',
        date: '',
        isExpense: true,
      });

    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name == "isExpense" ? value == "expense" ? true : false : value
    });
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            {financialCategories.map((category, index) => (
              <option key={index} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>
          <div className="error-message">{categoryError}</div>
        </div>
        <div className="form-control">
          <label>Description</label>
          <input type="text" name="text" value={formData.text} onChange={handleChange} placeholder="Enter Description" />
          <div className="error-message">{textError}</div>
        </div>
        <div className="form-control">
          <label>Amount</label>
          <div className="amount-div">
            <span>{formData.isExpense ? '-' : '+'}</span>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Amount" />
          </div>
          <div className="error-message">{amountError}</div>
        </div>
        <div className="form-control">
          <label>Transaction Type:</label>
          <label>
            <input type="radio" name="isExpense" value="expense" checked={formData.isExpense} onChange={handleChange} />
            Expense
          </label>
          <label>
            <input type="radio" name="isExpense" value="income" checked={!formData.isExpense} onChange={handleChange} />
            Income
          </label>
        </div>
        <div className="form-control">
          <label>Date</label>
          <input type="date" name="date" max={currentDate} value={formData.date} onChange={handleChange} />
          <div className="error-message">{dateError}</div>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
