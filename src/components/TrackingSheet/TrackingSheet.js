import { useState, useEffect } from 'react' 
import { Container, Table } from "react-bootstrap";
import deleteTransaction from '../TransactionItem/DeleteTransaction'
import editTransaction from '../TransactionItem/EditTransaction'


const TrackingSheet = ({transactions}) => {


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
          {transactions.map((transaction)=> (
            <tr>
            {/* <td>{transaction.date.toDate().toLocaleString()}</td> */}
            <td>{transaction.data.transaction}</td>
            <td>{transaction.data.category}</td>
            <td>{transaction.data.subcategory}</td>
            <td>{transaction.data.amount}</td>
            <td><button onClick = {()=>editTransaction(transaction.id)}>Edit</button></td>
            <td><button onClick = {()=>deleteTransaction(transaction.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};


export default TrackingSheet;
