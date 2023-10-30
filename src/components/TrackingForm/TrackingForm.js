import { useState } from "react";
import { Container, Col } from "react-bootstrap";
import { Form as BForm } from "react-bootstrap";
import { Form, useNavigate, useActionData, redirect } from "react-router-dom";
import classes from "./TrackingForm.module.css";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import store from "../../store/index";

import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal'



const transactionsCollectionRef = collection(db, "transactions");

const TrackingForm = ({ method, expense }) => {
  const dispatch = useDispatch();


  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const data = useActionData();
  const navigate = useNavigate();

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
            id="transaction"
            type="text"
            name="transaction"
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
            id="subcategory"
            name="subcategory"
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
            type="text"
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



  if (method === "POST") {
    const transactionData = {
      // date: data.get('date').unix(),
      transaction: data.get("transaction"),
      category: data.get("category"),
      subcategory: data.get("subcategory"),
      amount: data.get("amount"),
    };

    try {
      await addDoc(transactionsCollectionRef, transactionData);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "PUT") {
    const state = store.getState();
    const selectedTransaction = state.transaction.selectedTransaction;
    const transactionId = selectedTransaction.id.toString();
    const docRef = doc(transactionsCollectionRef, transactionId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());

    const updatedTransaction = {
      transaction: data.get("transaction"),
      category: data.get("category"),
      subcategory: data.get("subcategory"),
      amount: data.get("amount"),
    };
    updateDoc(docRef, updatedTransaction)
      .then(function () {
        console.log("Document successfully updated.");
      })
      .catch(function (error) {
        console.error("Error updating document:", error);
      });
  }

  return redirect("/tracker");
}
