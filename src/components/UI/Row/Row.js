import {

  Form,
  InputGroup,
  Button

} from "react-bootstrap";

const Row = () => {
  return (
    <tr>
      <td>
        {" "}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter category name..."
            aria-label="Category name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button>Save</Button>
      </td>
      <td>
        {" "}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Entered expected amount..."
            aria-label="Expected amount"
            aria-describedby="basic-addon1"
          />
        </InputGroup>{" "}
        <Button>Save</Button>
      </td>
      <td> 0 </td>
    </tr>
  );
};

export default Row;
