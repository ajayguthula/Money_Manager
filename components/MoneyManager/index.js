import {Component} from 'react'
import {v4 as V4Id} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    type: 'Income',
    yourBalance: 0,
    yourIncome: 0,
    yourExpenses: 0,
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amount: event.target.value})
  }

  onChangeTypeInput = event => {
    const selectionType =
      event.target.value === 'EXPENSES' ? 'Expenses' : 'Income'
    this.setState({type: selectionType})
  }

  onAddButton = event => {
    event.preventDefault()
    const {
      transactionList,
      title,
      amount,
      type,
      yourBalance,
      yourIncome,
      yourExpenses,
    } = this.state
    const newTransactionList = {
      id: V4Id(),
      title,
      amount,
      type,
      yourBalance,
      yourIncome,
      yourExpenses,
    }
    if (type === 'Income') {
      this.setState({
        transactionList: [...transactionList, newTransactionList],
        yourBalance: parseInt(yourBalance) + parseInt(amount),
        yourIncome: parseInt(yourIncome) + parseInt(amount),
        title: '',
        amount: '',
        type: 'Income',
      })
    } else {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransactionList],
        yourBalance: parseInt(yourBalance) - parseInt(amount),
        yourExpenses: parseInt(amount),
        title: '',
        amount: '',
        type: 'Income',
      }))
    }
  }

  onClickDeleteButton = id => {
    const {transactionList, yourBalance, yourIncome, yourExpenses} = this.state
    const deletedItem = transactionList.filter(eachItem => eachItem.id === id)
    const {amount, type} = deletedItem[0]
    const deletedItemFromList = transactionList.filter(
      eachItem => eachItem.id !== id,
    )
    if (type === 'Income') {
      this.setState({
        transactionList: deletedItemFromList,
        yourIncome: parseInt(yourIncome) - parseInt(amount),
        yourBalance: parseInt(yourBalance) - parseInt(amount),
      })
    } else {
      this.setState({
        transactionList: deletedItemFromList,
        yourExpenses: parseInt(yourExpenses) - parseInt(amount),
        yourBalance: parseInt(yourBalance) + parseInt(amount),
      })
    }
  }

  render() {
    const {
      transactionList,
      title,
      amount,
      type,
      yourBalance,
      yourIncome,
      yourExpenses,
    } = this.state
    return (
      <div className="main-container">
        <div>
          <p>Hi Richard</p>
          <p>Welcome back to your Money Manager</p>
        </div>
        <div>
          <div className="balance-container">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
              />
              <div>
                <p>Your Balance</p>
                <p data-testid="balanceAmount">Rs {yourBalance}</p>
              </div>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
              />
              <div>
                <p>Your Income</p>
                <p data-testid="incomeAmount">Rs {yourIncome}</p>
              </div>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
              />
              <div>
                <p>Your Expenses</p>
                <p data-testid="expensesAmount">Rs {yourExpenses}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="transaction-hist-container">
          <div className="transaction-container">
            <h1>Add Transaction</h1>
            <form className="form-container" onSubmit={this.onAddButton}>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="TITLE"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                value={amount}
                placeholder="AMOUNT"
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="type">TYPE</label>
              <select id="type" value={type} onChange={this.onChangeTypeInput}>
                {transactionTypeOptions.map(eachOption => (
                  <TransactionItem
                    txnItem={eachOption}
                    key={eachOption.optionId}
                  />
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="history-container">
            <h1>History</h1>
            <ul className="unordered_list">
              <li>
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionList.map(eachTxn => (
                <MoneyDetails
                  txnItem={eachTxn}
                  onClickDeleteButton={this.onClickDeleteButton}
                  key={eachTxn.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
