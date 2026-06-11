import React, { useReducer } from 'react';

// Interfaces for Income and Expense entries
interface IncomeEntry {
  id: string;
  description: string;
  amount: number;
  currency: 'USD' | 'EUR';
}

interface ExpenseEntry {
  id: string;
  description: string;
  amount: number;
  currency: 'USD' | 'EUR';
}

// Exchange rates interface
interface ExchangeRates {
  USD: number;
  EUR: number;
}

// Budget state interface
interface BudgetState {
  incomes: IncomeEntry[];
  expenses: ExpenseEntry[];
  selectedCurrency: 'USD' | 'EUR';
}

// Action types for reducer
type BudgetAction =
  | { type: 'addIncome'; income: IncomeEntry }
  | { type: 'addExpense'; expense: ExpenseEntry }
  | { type: 'setCurrency'; currency: 'USD' | 'EUR' };

// Exchange rates (1 USD = 0.85 EUR, 1 EUR = 1.18 USD)
const exchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.85
};

// Convert amount to selected currency
const convertToCurrency = (amount: number, fromCurrency: 'USD' | 'EUR', toCurrency: 'USD' | 'EUR'): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first (base currency)
  const inUSD = fromCurrency === 'EUR' ? amount / exchangeRates.EUR : amount;
  
  // Convert from USD to target currency
  return toCurrency === 'EUR' ? inUSD * exchangeRates.EUR : inUSD;
};

// Calculate total income in selected currency
const calculateTotalIncome = (incomes: IncomeEntry[], toCurrency: 'USD' | 'EUR'): number => {
  return incomes.reduce((total, income) => {
    return total + convertToCurrency(income.amount, income.currency, toCurrency);
  }, 0);
};

// Calculate total expenses in selected currency
const calculateTotalExpenses = (expenses: ExpenseEntry[], toCurrency: 'USD' | 'EUR'): number => {
  return expenses.reduce((total, expense) => {
    return total + convertToCurrency(expense.amount, expense.currency, toCurrency);
  }, 0);
};

// Reducer function
const budgetReducer = (state: BudgetState, action: BudgetAction): BudgetState => {
  switch (action.type) {
    case 'addIncome':
      return { ...state, incomes: [...state.incomes, action.income] };
    
    case 'addExpense':
      return { ...state, expenses: [...state.expenses, action.expense] };
    
    case 'setCurrency':
      return { ...state, selectedCurrency: action.currency };
    
    default:
      return state;
  }
};

// Main Budget Tracker Component
interface BudgetTrackerProps {
  rates?: ExchangeRates;  // Optional - can override default rates
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ rates = exchangeRates }) => {
  const [state, dispatch] = useReducer(budgetReducer, {
    incomes: [],
    expenses: [],
    selectedCurrency: 'USD'
  });

  const [incomeDesc, setIncomeDesc] = React.useState('');
  const [incomeAmount, setIncomeAmount] = React.useState('');
  const [incomeCurrency, setIncomeCurrency] = React.useState<'USD' | 'EUR'>('USD');

  const [expenseDesc, setExpenseDesc] = React.useState('');
  const [expenseAmount, setExpenseAmount] = React.useState('');
  const [expenseCurrency, setExpenseCurrency] = React.useState<'USD' | 'EUR'>('USD');

  const totalIncome = calculateTotalIncome(state.incomes, state.selectedCurrency);
  const totalExpenses = calculateTotalExpenses(state.expenses, state.selectedCurrency);
  const netBalance = totalIncome - totalExpenses;

  // Prevent negative balance check
  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(incomeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    const newIncome: IncomeEntry = {
      id: Date.now().toString(),
      description: incomeDesc || 'Income',
      amount: amount,
      currency: incomeCurrency
    };

    dispatch({ type: 'addIncome', income: newIncome });
    setIncomeDesc('');
    setIncomeAmount('');
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    // Type-safe check for negative balance
    const expenseInSelectedCurrency = convertToCurrency(amount, expenseCurrency, state.selectedCurrency);
    if (expenseInSelectedCurrency > totalIncome - totalExpenses) {
      alert('Cannot add expense: Would cause negative balance!');
      return;
    }

    const newExpense: ExpenseEntry = {
      id: Date.now().toString(),
      description: expenseDesc || 'Expense',
      amount: amount,
      currency: expenseCurrency
    };

    dispatch({ type: 'addExpense', expense: newExpense });
    setExpenseDesc('');
    setExpenseAmount('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Budget Tracker</h2>
      
      {/* Currency Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label>View Balance in: </label>
        <select
          value={state.selectedCurrency}
          onChange={(e) => dispatch({ type: 'setCurrency', currency: e.target.value as 'USD' | 'EUR' })}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      {/* Summary */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Summary</h3>
        <p>Total Income: {state.selectedCurrency} {totalIncome.toFixed(2)}</p>
        <p>Total Expenses: {state.selectedCurrency} {totalExpenses.toFixed(2)}</p>
        <p style={{ 
          color: netBalance >= 0 ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          Net Balance: {state.selectedCurrency} {netBalance.toFixed(2)}
        </p>
      </div>

      {/* Add Income Form */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Add Income</h3>
        <form onSubmit={handleAddIncome}>
          <input
            type="text"
            value={incomeDesc}
            onChange={(e) => setIncomeDesc(e.target.value)}
            placeholder="Description"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="number"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            placeholder="Amount"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <select
            value={incomeCurrency}
            onChange={(e) => setIncomeCurrency(e.target.value as 'USD' | 'EUR')}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button type="submit">Add Income</button>
        </form>
      </div>

      {/* Add Expense Form */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Add Expense</h3>
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            value={expenseDesc}
            onChange={(e) => setExpenseDesc(e.target.value)}
            placeholder="Description"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Amount"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <select
            value={expenseCurrency}
            onChange={(e) => setExpenseCurrency(e.target.value as 'USD' | 'EUR')}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button type="submit">Add Expense</button>
        </form>
      </div>

      {/* Income List */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Income Entries</h3>
        <ul>
          {state.incomes.map(income => (
            <li key={income.id}>
              {income.description}: {income.amount} {income.currency}
            </li>
          ))}
        </ul>
      </div>

      {/* Expense List */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Expense Entries</h3>
        <ul>
          {state.expenses.map(expense => (
            <li key={expense.id}>
              {expense.description}: {expense.amount} {expense.currency}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetTracker;
