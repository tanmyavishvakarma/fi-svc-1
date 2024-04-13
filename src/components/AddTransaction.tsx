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
}

export const AddTransaction: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    text: '',
    amount: 0,
    category: '',
    date: '',
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

    // Validate amount
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
      const newTransaction: Transaction = {
        id: Math.floor(Math.random() * 100000000),
        isExpense: formData.amount < 0,
        ...formData
      };

      addTransaction(newTransaction)

      try {
        const response = await fetch('api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransaction),
        });

        if (!response.ok) {
          throw new Error();
        }

        // Assuming the response contains the newly added transaction data or some indicator of success
        // You can handle the response based on your API implementation
        // For example, you may update UI based on the response
        // const responseData = await response.json();
        // handleResponse(responseData);

        // Clear form data after successful submission
        setFormData({
          text: '',
          amount: 0,
          category: '',
          date: '',
        });
      } catch (error) {
        console.error(error);
        // Handle error state or display error message to the user
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseInt(value) : value,
    });
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            {financialCategories.map((category, index) => (
              <option key={index} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>
          <div className="error-message">{categoryError}</div>
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Amount" />
          <div className="error-message">{amountError}</div>
        </div>

        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input type="text" name="text" value={formData.text} onChange={handleChange} placeholder="Enter Description" />
          <div className="error-message">{textError}</div>

        </div>

        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <div className="error-message">{dateError}</div>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
