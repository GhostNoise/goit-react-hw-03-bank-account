import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <table className={styles.history}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(newTransaction => (
          <tr key={newTransaction.id}>
            <td>{newTransaction.type}</td>
            <td>{newTransaction.enteredNumber}$</td>
            <td>{newTransaction.actualDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      enteredNumber: PropTypes.number.isRequired,
      actualDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
