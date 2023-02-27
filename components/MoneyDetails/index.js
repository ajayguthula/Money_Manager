const MoneyDetails = props => {
  const {txnItem, onClickDeleteButton} = props
  const {id, title, amount, type} = txnItem

  const onClickDelete = () => {
    onClickDeleteButton(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" data-testid="delete" onClick={onClickDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default MoneyDetails
