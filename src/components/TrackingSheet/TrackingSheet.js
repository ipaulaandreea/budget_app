import { Container, Table } from "react-bootstrap";

const TrackingSheet = () => {
  return (
    <>
      <Container>
        <h1>Expenses tracker</h1>
        <h1>Your Balance</h1>
        <h1>10$</h1>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TrackingSheet;
