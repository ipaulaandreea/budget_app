import { useState, useEffect } from 'react' 
import { Container, Table } from "react-bootstrap";
import deleteTransaction from '../TransactionItem/DeleteTransaction'
import EditModal from '../UI/EditModal/EditModal'
import {transactionActions } from '../../store/transaction'

import { useSelector, useDispatch } from 'react-redux'
import { modalActions } from '../../store/modal' 

const TrackingSheet = ({transactions}) => {
  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.modal.displayModal);

const [transactionsState, setTransactionsState] = useState(transactions);
// const [showEditModal, setShowEditModal] = useState(false);
// const [selectedTransaction, setSelectedTransaction]=useState(null)

useEffect(() => {
  setTransactionsState(transactions);
}, [transactions]);

const deleteHandler = async (id)=>{
  await deleteTransaction(id)
  setTransactionsState(transactionsState.filter(transaction => transaction.id !== id))
}

const editHandler = (transaction) => {
  dispatch(transactionActions.selectTransaction(transaction));
  // setShowEditModal(true); 
  dispatch(modalActions.isEditting())
  dispatch(modalActions.displayModal());



};

const addHandler = () => {
  dispatch(modalActions.isAdding());
}

// const hideModal = () => {
//   // setShowEditModal(false)
//   dispatch(modalActions.hideModal())
// }

  return (
    <>
    {showEditModal&&
      <EditModal/>
    }
      <Container>
        <button onClick = {addHandler}>Add transaction </button>
        <h1>Transactions tracker</h1>
        <h3>Left to spend</h3>
        <h3>10$</h3>
        <h3>Expenses</h3>
        <h3>500$</h3>
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
            <td><button onClick = {()=>editHandler(transaction)}>Edit</button></td>
            <td><button onClick = {()=>deleteHandler(transaction.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>


</>

  );
};


export default TrackingSheet;
