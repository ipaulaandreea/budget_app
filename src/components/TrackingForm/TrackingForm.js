import { useState } from "react";
import { Container, Col } from "react-bootstrap";
import { Form as BForm } from "react-bootstrap";
import { Form, useActionData, redirect } from "react-router-dom";
import classes from "./TrackingForm.module.css";
import store from "../../store/index";

import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal'
import axios from 'axios';


const TrackingForm = ({ method, expense }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const data = useActionData();
  const categoryOptions = [
    {
      value: "Income",
      label: "Income",
    },
    {
      value: "Expense",
      label: "Expense",
    },
  ];

  const subcategoryOptions = {
    Income: [
      { value: "salary", label: "salary" },
      { value: "side hustle", label: "side hustle" },
      { value: "bonus", label: "bonus" },
      { value: "selling", label: "selling" },
      { value: "dividens", label: "dividends" },
      { value: "other", label: "other" },
    ],
    Expense: [
      { value: "rent", label: "rent" },
      { value: "mortage", label: "mortage" },
      { value: "loans", label: "loans" },
      { value: "subscriptions", label: "subscriptions" },
      { value: "electric bill", label: "electric bill" },
      { value: "water", label: "water" },
      { value: "gas", label: "gas" },
      { value: "internet", label: "internet" },
      { value: "vacation", label: "vacation" },
      { value: "home maintenance", label: "home maintenance" },
      { value: "groceries", label: "groceries" },
      { value: "gifts", label: "gifts" },
      { value: "shopping", label: "shopping" },
    ],
  };

  const cancelHandler = () => {
     dispatch(modalActions.hideModal());
  };

  return (
    <Container>
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
            id="description"
            type="text"
            name="description"
            required
          />
        </Col>
        <Col>
          <BForm.Select
            id="category"
            name="category"
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
            {selectedCategory !== "" &&
              subcategoryOptions[selectedCategory].map((subcategory) => (
                <option key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </option>
              ))}
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
        </Col>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button>Save</button>
        </div>
      </Form>
    </Container>
  );
};

export default TrackingForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const category_name =  data.get("category_name")
  const description = data.get("description")
  const amount = data.get("amount")

  if (method === "POST") {
    try {
      const response = await axios.post('http://localhost:5000/api/addtransaction', {category_name, description, amount});
      console.log('New category created:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }


  if (method === "PUT") {
    try {
    const state = store.getState();
    const selectedTransaction = state.transaction.selectedTransaction;
    console.log(selectedTransaction)
    const id = selectedTransaction._id;
    let updatedData = {
      _id: id,
      category_name: data.get("category_name"), 
      description: data.get("description"),
      amount: data.get("amount"),
      month: 1, 
      year: 2023,
      day: 3
    }
    await axios.put(`http://localhost:5000/api/updatetransaction/${id}`, updatedData);
    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

  return redirect("/tracker");
}
