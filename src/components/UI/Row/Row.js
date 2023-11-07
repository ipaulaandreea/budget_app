import {useState, useEffect} from 'react';
import { defer, Form, redirect } from "react-router-dom";
import {onSnapshot, query, collection, where, addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import {Form as RForm} from 'react-bootstrap'
import getFunc from '../../../components/SetBudget/getCategories'

const budgetRef = collection (db, "budgetUpdatedVersion")

const Row = ({ method }) => {
  
  const [fetchedIncomeCategories, setFetchedIncomeCategories] = useState([]);
  const [fetchedExpensesCategories, setFetchedExpensesCategories] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getFunc();
        setFetchedIncomeCategories(categories.incomeCategories);
        setFetchedExpensesCategories(categories.expensesCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []);

  console.log("fetchedIncomeCategoriesState:", fetchedIncomeCategories);
  console.log("fetchedExpensesCategoriesState:", fetchedExpensesCategories);


  
  return (
 
      <Form method={method}>
         <RForm.Select id='category' size="sm" placeholder="Select category">
         {fetchedIncomeCategories.map((category) => (
        <option key='category_name' value={category['category_name']}>{category['category_name']}</option>
        ))}
      </RForm.Select>
      <input type="text" id="amount_expected" name="amount_expected" placeholder="Enter expected amount..."/>

      <button type="submit">Save</button>
      </Form>

  );
};

export default Row;

export async function action({ request, params, categoryData }) {
  const method = request.method;


  if (method === "POST") {
      const data = await request.formData();
      var selectBox = document.getElementById("category");
      var selectedValue = selectBox.value;
      const categoryData = {
        category_name: selectedValue,
        amount_expected: data.get("amount_expected"),
        category_type: 'income',
        month: 1,
        year: 2023
      };

      try {
        await addDoc(budgetRef, categoryData);
      } catch (err) {
        console.log(err);
      }
  }

  return redirect ('/set-budget');
}