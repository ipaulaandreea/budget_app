import { useState, useEffect } from "react";
import { Container, Table, Dropdown } from "react-bootstrap";
import deleteTransaction from "../TransactionItem/DeleteTransaction";
import EditModal from "../UI/EditModal/EditModal";
import { transactionActions } from "../../store/transaction";
import { budgetItemActions } from "../../store/budgetItems";
import { months, years } from "../SetBudget/DateOptions";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal";
import getTransactionsByDate from './getTransactionsByDate'
const TrackingSheet = ({ transactions }) => {

  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.modal.displayModal);
  const [transactionsState, setTransactionsState] = useState(transactions);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredTransactionsState, setFilteredTransactionsState] = useState([])

  const displayTransactionsByDate = async () => {
    const filteredTransactions = await getTransactionsByDate(selectedYear, selectedMonth);
    setTransactionsState(filteredTransactions);
    setFilteredTransactionsState(filteredTransactions);
  };

  const compareStates = () => {
    let newTransactions = transactions.filter(transaction =>
      !filteredTransactionsState.some(prevTransaction => prevTransaction['_id'] === transaction['_id'])
    );
  
    if (newTransactions) {
      handleAddTransaction(newTransactions);
    }
  };

  const handleAddTransaction = (newTransaction) => {
    if (newTransaction !== null) {
      if (
        newTransaction.year === selectedYear &&
        newTransaction.month === selectedMonth
      ) {
        setFilteredTransactionsState((prevTransactions) => [...prevTransactions, newTransaction]);
      }
    }
  };

  

  // useEffect(() => {
  //   setTransactionsState(transactions);
  //   compareStates()
    

  // }, [transactions,]);

  useEffect(() => {
    compareStates()
    if (selectedMonth !== null && selectedYear !== null) {
      displayTransactionsByDate();

    }
  }, [selectedMonth, selectedYear, transactions]);

  const selectedYearHandler = (year) => {
    console.log(year.value);
    setSelectedYear(year.value);
  };

  const selectedMonthHandler = (month) => {
    setSelectedMonth(month.value);
  };


  const deleteHandler = async (id) => {
    const selectedTransaction = transactionsState.filter(
      (transaction) => transaction["_id"] === id
    );
    let message = window.confirm("Are you sure?");
    if (message) {
      dispatch(budgetItemActions.deleteTransaction(selectedTransaction));
      await deleteTransaction(id);

      setTransactionsState(
        transactionsState.filter((transaction) => transaction["_id"] !== id)
      );
    }
  };


  const editHandler = (transaction) => {
    dispatch(transactionActions.selectTransaction(transaction));
    dispatch(modalActions.isEditting());
    dispatch(modalActions.displayModal());
  };

  const addHandler = async () => {
    dispatch(modalActions.isAdding());
    dispatch(transactionActions.selectMonth(selectedMonth)); 
    dispatch(transactionActions.selectYear(selectedYear)); 
    // await displayTransactionsByDate()
  }


  return (
    <>
      {showEditModal && <EditModal />}

      <>
        <Container>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Year
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {years.map((year) => (
                <Dropdown.Item onClick={() => selectedYearHandler(year)}>
                  {year.value}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Month
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {months.map((month) => (
                <Dropdown.Item onClick={() => selectedMonthHandler(month)}>
                  {month.value}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </>

      <Container>
        <button onClick={addHandler}>Add transaction </button>
        {(selectedMonth != null) & (selectedYear != null) && (
          <h1>
            Your transactions for: {selectedMonth} {selectedYear}
          </h1>
        )}
        <h3>Left to spend</h3>
        <h3>10$</h3>
        <h3>Expenses</h3>
        <h3>500$</h3>
      </Container>
      {transactionsState !==null && 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredTransactionsState.map((transaction) => (
            <tr>
              <td>{transaction.month}{transaction.year}</td>
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
  }
    </>
  );
};

export default TrackingSheet;
