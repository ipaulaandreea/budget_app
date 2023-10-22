import { useState, useEffect } from 'react' 
import { Container, Table } from "react-bootstrap";
import deleteTransaction from '../TransactionItem/DeleteTransaction'
import editTransaction from '../TransactionItem/EditTransaction'


const TrackingSheet = ({transactions}) => {
  console.log(transactions);
const [transactionsState, setTransactionsState] = useState(transactions);

useEffect(() => {
  setTransactionsState(transactions);
}, [transactions]);

const deleteHandler = async (id)=>{
  await deleteTransaction(id)
  setTransactionsState(transactionsState.filter(transaction => transaction.id !== id))
}
  return (
    <>
      <Container>
        <h1>Transactions tracker</h1>
        <h1>Your Balance</h1>
        <h1>10$</h1>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Date</th> */}
            <th>Transaction</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionsState.map((transaction)=> (
            <tr>
            {/* <td>{transaction.date.toDate().toLocaleString()}</td> */}
            <td>{transaction.data.transaction}</td>
            <td>{transaction.data.category}</td>
            <td>{transaction.data.subcategory}</td>
            <td>{transaction.data.amount}</td>
            <td><button onClick = {()=>editTransaction(transaction.id)}>Edit</button></td>
            <td><button onClick = {()=>deleteHandler(transaction.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};


export default TrackingSheet;
