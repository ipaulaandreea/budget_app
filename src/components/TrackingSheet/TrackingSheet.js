import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import deleteTransaction from "../TransactionItem/DeleteTransaction";
import EditModal from "../UI/EditModal/EditModal";
import { transactionActions } from "../../store/transaction";

import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal";

const TrackingSheet = ({ transactions }) => {
  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.modal.displayModal);
  const [transactionsState, setTransactionsState] = useState(transactions);
  useEffect(() => {
    setTransactionsState(transactions);
  }, [transactions]);

  const deleteHandler = async (id) => {
    await deleteTransaction(id);
    setTransactionsState(
      transactionsState.filter((transaction) => transaction["_id"] !== id)
    );
  };

  const editHandler = (transaction) => {
    dispatch(transactionActions.selectTransaction(transaction));
    dispatch(modalActions.isEditting());
    dispatch(modalActions.displayModal());
  };

  const addHandler = () => {
    dispatch(modalActions.isAdding());
  };


  return (
    <>
      {showEditModal && <EditModal />}
      <Container>
        <button onClick={addHandler}>Add transaction </button>
        <h1>Transactions tracker</h1>
        <h3>Left to spend</h3>
        <h3>10$</h3>
        <h3>Expenses</h3>
        <h3>500$</h3>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionsState.map((transaction) => (
            <tr>
              <td>{transaction.description}</td>
              <td>{transaction.category_name}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => editHandler(transaction)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteHandler(transaction["_id"])}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TrackingSheet;
