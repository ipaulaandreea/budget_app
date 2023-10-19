import { Container, Col } from "react-bootstrap";
import {Form as BForm} from "react-bootstrap";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import classes from "./TrackingForm.module.css";

const TrackingForm = ({ method, expense }) => {
  const data = useActionData();
  const navigate = useNavigate();
  // const navigation = useNavigation();


  const cancelHandler = () => {
    navigate('..');
  };


  return (
    <Container>
      <h3>Add New Transaction: </h3>
      <Form method={method}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
        <Col>
          <BForm.Control
            placeholder="date"
            id="date"
            type="date"
            name="date"
            required
            // defaultValue={event ? event.title : ''}
          />
        </Col>
        <Col>
          <BForm.Control
            placeholder="Transaction"
            id="transaction"
            type="text"
            name="transaction"
            required
            // defaultValue={event ? event.title : ''}
          />
        </Col>
        <Col>
          <BForm.Control
            placeholder="Category"
            id="category"
            type="text"
            name="category"
            required
          />
        </Col>

        <Col>
          <BForm.Control
            placeholder="Subcategory"
            id="subcategory"
            type="text"
            name="subcategory"
            required
          />
        </Col>
        
        <Col>
          <BForm.Control
            placeholder="Amount"
            id="amount"
            type="text"
            name="amount"
            required
          />
        </Col>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button>
            Save
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default TrackingForm;

export async function action({ request, params }) {

  const method = request.method;
  const data = await request.formData();

  const transactionData = {
    date: data.get('date'),
    transaction: data.get('transaction'),
    category: data.get('category'),
    subcategory: data.get('subcategory'),
    amount: data.get('amount'),
  };

  let url = 'https://budget-app-ed017-default-rtdb.europe-west1.firebasedatabase.app/transactions.json';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save transaction.' }, { status: 500 });
  }


  return redirect('/tracker');
}
