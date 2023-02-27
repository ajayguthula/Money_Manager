const TransactionItem = props => {
  const {txnItem} = props
  const {optionId, displayText} = txnItem
  return <option value={optionId}>{displayText}</option>
}

export default TransactionItem
