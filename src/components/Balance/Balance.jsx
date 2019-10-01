import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, transactions }) => {
  const handleTransaction = type => {
    const renderBalance = transactions
      .filter(newTransaction => newTransaction.type === type)
      .reduce((acc, val) => acc + val.enteredNumber, 0);
    return renderBalance;
  };

  return (
    <section className={styles.balance}>
      <span role="img" aria-label="deposit">
        ⬆️{handleTransaction('deposit')}$
      </span>
      <span role="img" aria-label="withdraw">
        ⬇️{handleTransaction('withdraw')}
      </span>
      <span>Balance: {balance}$</span>
    </section>
  );
};
Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      enteredNumber: PropTypes.number.isRequired,
      actualDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Balance;
