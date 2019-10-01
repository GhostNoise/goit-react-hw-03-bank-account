import React from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';

export default class Dashboard extends React.Component {
  state = {
    transactions: [],
    balance: 0,
  };

  setLocalStorage = () => {
    localStorage.setItem(
      'transactions',
      JSON.stringify(this.state.transactions),
    );
    localStorage.setItem('balance', JSON.stringify(this.state.balance));
    return;
  };

  componentDidMount() {
    const transactionsStorage = JSON.parse(
      localStorage.getItem('transactions'),
    );
    const balanceStorage = JSON.parse(localStorage.getItem('balance'));
    if (transactionsStorage) {
      this.setState({
        transactions: transactionsStorage,
        balance: balanceStorage,
      });
    }
  }

  handleTransaction = newTransaction => {
    this.setState(
      prevState => ({
        transactions: [...prevState.transactions, newTransaction],
        balance:
          newTransaction.type === 'deposit'
            ? prevState.balance + newTransaction.enteredNumber
            : prevState.balance - newTransaction.enteredNumber,
      }),
      this.setLocalStorage,
    );
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div className={styles.dashboard}>
        <Controls
          balance={balance}
          handleTransaction={this.handleTransaction}
        />
        <Balance balance={balance} transactions={transactions} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
