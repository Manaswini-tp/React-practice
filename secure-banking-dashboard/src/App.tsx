import React, { useState } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import BudgetTracker from './components/BudgetTracker';

interface Transaction {
  id: string;
  amount: number;
  currency: 'USD' | 'EUR';
  date: Date;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showBudgetTracker, setShowBudgetTracker] = useState(false);

  const handleTransactionSubmit = (amount: number, currency: 'USD' | 'EUR') => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      currency,
      date: new Date()
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleSelectTransaction = (id: string) => {
    alert(`Selected transaction: ${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Secure Banking Dashboard</h1>
      
      <button 
        onClick={() => setShowBudgetTracker(!showBudgetTracker)}
        style={{ marginBottom: '20px', padding: '10px' }}
      >
        {showBudgetTracker ? 'Show Transactions' : 'Show Budget Tracker'}
      </button>

      {!showBudgetTracker ? (
        <>
          <h2>Bank Transactions</h2>
          <TransactionForm onSubmit={handleTransactionSubmit} />
          <TransactionList 
            transactions={transactions} 
            onSelect={handleSelectTransaction} 
          />
        </>
      ) : (
        <BudgetTracker />
      )}
    </div>
  );
};

export default App;