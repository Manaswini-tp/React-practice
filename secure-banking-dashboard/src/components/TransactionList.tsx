import React from 'react';

interface Transaction {
  id: string;
  amount: number;
  currency: 'USD' | 'EUR';
  date: Date;
}

interface TransactionListProps {
  transactions: Transaction[];
  onSelect: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onSelect
}) => (
  <ul>
    {transactions.map(tx => (
      <li key={tx.id} onClick={() => onSelect(tx.id)}>
        {tx.amount} {tx.currency} - {tx.date.toLocaleDateString()}
      </li>
    ))}
  </ul>
);

export default TransactionList;