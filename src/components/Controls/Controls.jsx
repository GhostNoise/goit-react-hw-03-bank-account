import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Controls.module.css';

toast.configure();

export default class Controls extends Component {
  static propTypes = {
    handleTransaction: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
  };

  state = {
    input: '',
  };

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      input: value,
    });
  };

  handleClick = event => {
    event.preventDefault();

    const { name } = event.target;
    const { input } = this.state;
    const { handleTransaction, balance } = this.props;

    const enteredNumber = Number(input);
    const actualDate = new Date().toLocaleString();

    const newTransaction = {
      id: shortid.generate(),
      type: name,
      enteredNumber,
      actualDate,
    };

    if (
      balance < newTransaction.enteredNumber &&
      newTransaction.type === 'withdraw'
    ) {
      toast('На счету недостаточно средств для проведения операции!');
      this.setState({ input: '' });
      return;
    }

    if (input === '' || Number(input) < 0 || input === '0') {
      toast('Введите сумму для проведения операции!');
      this.setState({ input: '' });
      return;
    }

    handleTransaction(newTransaction);
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          value={input}
          onChange={this.handleInput}
          placeholder="Enter your number"
        />
        <button type="button" name="deposit" onClick={this.handleClick}>
          Deposit
        </button>
        <button type="button" name="withdraw" onClick={this.handleClick}>
          Withdraw
        </button>
      </section>
    );
  }
}
