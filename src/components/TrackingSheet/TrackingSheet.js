import { useState, useEffect } from 'react' 
import { Container, Table } from "react-bootstrap";
import deleteTransaction from '../TransactionItem/DeleteTransaction'
import EditTransaction from '../EditTransaction'
import EditModal from '../UI/EditModal/EditModal'


import { useSelector, useDispatch } from 'react-redux'
import { modalActions } from '../../store/modal' 

const TrackingSheet = ({transactions}) => {
  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.modal.displayModal);

const [transactionsState, setTransactionsState] = useState(transactions);
// const [showEditModal, setShowEditModal] = useState(false);
const [selectedTransaction, setSelectedTransaction]=useState(null)

useEffect(() => {
  setTransactionsState(transactions);
}, [transactions]);

const deleteHandler = async (id)=>{
  await deleteTransaction(id)
  setTransactionsState(transactionsState.filter(transaction => transaction.id !== id))
}

const editHandler = (transaction) => {
  console.log('im here')
  setSelectedTransaction(transaction)
  // setShowEditModal(true); 
  dispatch(modalActions.displayModal());


};

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
