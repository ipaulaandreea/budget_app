import { useState, useEffect, useRef } from "react";
import { Container, Col } from "react-bootstrap";
import { Form as BForm } from "react-bootstrap";
import { Form, useActionData, redirect } from "react-router-dom";
import classes from "./TrackingForm.module.css";
import store from "../../store/index";
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal'
import axios from 'axios';
import {updateActualAmount} from './updateActualAmount'
import {transactionActions} from '../../store/transaction'
import getCredentials from "../../Credentials";
import getBudgetEntries from '../../components/SetBudget/getBudgetEntries'
import getAvailableCategories from '../SetBudget/getAvailableBudgetCategories'

const TrackingForm = ({ method, expense }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const data = useActionData();
  const selectedMonth = useSelector((state) => state.transaction.selectedMonth); 
  const selectedYear = useSelector((state) => state.transaction.selectedYear);   
  const [expenseCategoriesState, setExpenseCategoriesState] = useState([])
  const [incomeCategoriesState, setIncomeCategoriesState] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let categories = await getAvailableCategories(selectedMonth,selectedYear);
        console.log('fetched categories', categories);
        setExpenseCategoriesState(categories.budgetExpensesCategories)
        setIncomeCategoriesState(categories.budgetIncomeCategories)

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [selectedMonth,selectedYear]);



  const categoryOptions = [
    {
      value: "income",
      label: "income",
    },
    {
      value: "expense",
      label: "expense",
    },
  ];


  const cancelHandler = () => {
     dispatch(modalActions.hideModal());
  };

  const addTransactionHandler = async (event) => {
    try {
      const formData = new FormData(formRef.current);
      const transactionData = {
        description: formData.get("description"),
        type: formData.get("type"),
        category_name: formData.get("category_name"),
        amount: formData.get("amount"),
        month: selectedMonth,
        year: selectedYear,
      };

      dispatch(transactionActions.addTransaction(transactionData));
      console.log("in TrackingForm");
      dispatch(modalActions.isAdding());
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
   
  };
 

  const renderSubcategoryOptions = selectedCategory !== "" && (
    selectedCategory === "expense"
      ? expenseCategoriesState.map((subcategory) => (
          <option key={subcategory.category_name} value={subcategory.category_name}>
            {subcategory.category_name}
          </option>
        ))
      : incomeCategoriesState.map((subcategory) => (
          <option key={subcategory.category_name} value={subcategory.category_name}>
            {subcategory.category_name}
          </option>
        ))
  );


  return (
   
    <Container>
      <Form method={method} ref={formRef}>
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
            id="description"
            type="text"
            name="description"
            required
          />
        </Col>
        <Col>
          <BForm.Select
            id="type"
            name="type"
            required
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </BForm.Select>
        </Col>
        <Col>
          <BForm.Select
            id="category_name"
            name="category_name"
            required
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Subcategory</option>
            {renderSubcategoryOptions}
          </BForm.Select>
        </Col>

        <Col>
          <BForm.Control
            placeholder="Amount"
            id="amount"
            type="number"
            name="amount"
            required
          />
            <BForm.Control
            value={selectedYear}
            id="year"
            type="text"
            name="year"
            required
          />
            <BForm.Control
            value={selectedMonth}
            id="month"
            type="text"
            name="month"
            required
          />
        </Col>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button onClick={addTransactionHandler}>Save</button>
        </div>
      </Form>
    </Container>
  
  );
};

export default TrackingForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  let amountDifference = 0; 
  let transactionData = {
     category_name :  data.get("category_name"),
     type : data.get('type'),
     description : data.get("description"),
     amount : data.get("amount"),
     month : data.get('month'),
     year :  data.get('year'),
  }
  const category_name =  data.get("category_name")
  const type = data.get('type');
  const description = data.get("description")
  const amount = data.get("amount")
  const month = data.get("month")
  const year =  data.get("year")
  amountDifference = amount;

  if (method === "POST") {
    try {
      let user = localStorage.getItem('user')
      let credentials = getCredentials();
      const response = await axios.post('http://localhost:5000/api/addtransaction', {user, category_name, type, description, amount, month, year}, 
      {withCredentials: true},
  {
    headers: {
      'Authorization': `Bearer ${credentials.getToken()}`,
      'Cookie': `${credentials.getRefreshTokenForHeader()}`
    }
  }
      );
      console.log('New category created:', response.data);
      await updateActualAmount(transactionData, amountDifference)
    } catch (error) {
      console.error('Error creating post:', error);
    }
    
    
  }


  if (method === "PUT") {
    try {
    let user = localStorage.getItem('user');
    let credentials = getCredentials();
    const state = store.getState();
    const selectedTransaction = state.transaction.selectedTransaction;
    console.log(selectedTransaction)
    const id = selectedTransaction._id;
    const prevAmount = parseFloat(selectedTransaction.amount); 
    if (prevAmount !== parseFloat(data.get("amount"))){
      amountDifference = parseFloat(data.get("amount")) - prevAmount;
    } 
    let updatedData = {
      user:user,
      _id: id,
      category_name: data.get("category_name"), 
      description: data.get("description"),
      amount: data.get("amount"),
      month: data.get('month'), 
      year: data.get('year')
    }
    await axios.put(`http://localhost:5000/api/updatetransaction/${id}`, updatedData,
    {withCredentials: true},
  {
    headers: {
      'Authorization': `Bearer ${credentials.getToken()}`,
      'Cookie': `${credentials.getRefreshTokenForHeader()}`
    }
  }
    );
    console.log('Data updated successfully');
    await updateActualAmount(updatedData, amountDifference)
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

  return redirect("/tracker");
}
