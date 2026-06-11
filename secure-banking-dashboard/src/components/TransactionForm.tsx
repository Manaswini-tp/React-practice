import React from 'react';

interface TransactionFormState {
  amount: string;
  currency: 'USD' | 'EUR';
}

interface TransactionFormProps {
  onSubmit: (amount: number, currency: 'USD' | 'EUR') => void;
}

class TransactionForm extends React.Component<TransactionFormProps, TransactionFormState> {
  state: TransactionFormState = { amount: '', currency: 'USD' };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(Number(this.state.amount), this.state.currency);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="number"
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })}
          placeholder="Amount"
        />
        <select
          value={this.state.currency}
          onChange={e => this.setState({ currency: e.target.value as 'USD' | 'EUR' })}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button type="submit">Submit Transaction</button>
      </form>
    );
  }
}

export default TransactionForm;