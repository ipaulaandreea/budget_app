import { Container, Table } from "react-bootstrap";

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
            <th>Date</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction)=> (
            <tr>
            <td>{transaction.date.toDate().toLocaleString()}</td>
            <td>{transaction.transaction}</td>
            <td>{transaction.category}</td>
            <td>{transaction.subcategory}</td>
            <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TrackingSheet;
