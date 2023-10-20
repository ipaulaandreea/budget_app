
import { Container, Col } from "react-bootstrap";
import {Form as BForm} from "react-bootstrap";
import {
  Form,
  useNavigate,
  useActionData,
  redirect,
} from "react-router-dom";
import classes from "./TrackingForm.module.css";
import { collection, addDoc} from 'firebase/firestore'
import { db } from '../../config/firebase'



const transactionsCollectionRef=collection(db,'transactions')

const TrackingForm = ({ method, expense }) => {

  const data = useActionData();
  const navigate = useNavigate();


const categoryOptions=[
  {
    value: 'Income', 
    label: 'Income', 
    subcategories: [
      'salary', 
      'side hustle',
      'bonus', 
      'selling', 
      'dividens', 
      'other'
    ]
  }, 
  {
    value: 'Expense', 
    label: 'Expense', 
    subcategories: [
      'rent', 
      'mortage',
      'loans', 
      'subscriptions', 
      'electricity', 
      'water',
      'gas',
      'internet',
      'vacation',
      'home maintenance',
      'groceries',
      'gifts',
      'shopping'
    ]
  }
]

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
            placeholder="Transaction"
            id="transaction"
            type="text"
            name="transaction"
            required
            // defaultValue={event ? event.title : ''}
          />
        </Col>
        <Col>

        

<BForm.Select
  id="category"
  name="category"
  required
>
  <option value="">Category</option>
  {categoryOptions.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</BForm.Select>

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

  // const method = request.method;
  const data = await request.formData();

  const transactionData = {
    // date: data.get('date').unix(),
    transaction: data.get('transaction'),
    category: data.get('category'),
    subcategory: data.get('subcategory'),
    amount: data.get('amount'),
  };

  try {
    await addDoc(transactionsCollectionRef, transactionData)
  }
  catch (err){
    console.log(err)
  }
  
  return redirect('/tracker');
}
