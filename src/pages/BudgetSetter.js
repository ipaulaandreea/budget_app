import { Container } from "react-bootstrap";
import SetBudget from '../components/SetBudget/SetBudget'


import { Form, useNavigate, useActionData, redirect } from "react-router-dom";

import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import store from "../store/index";

import { useDispatch } from "react-redux";
import { useLoaderData, Await, defer } from 'react-router-dom';

    const BudgetSetterPage = () => {
        const { expensesByMonth, incomeByMonth } = useLoaderData();
        return (
          <Await resolve={[expensesByMonth, incomeByMonth]}>
              {([loadedExpenses, loadedIncome]) => (
            <Container>
    
            <h3>Set your budget </h3>
            <SetBudget expensesByMonth={loadedExpenses} incomeByMonth={loadedIncome}/>
            </Container>
              )}

            </Await>
        )
    
    }


export default BudgetSetterPage;

async function showFirebaseDataByMonth(month) {
    let transactionsByMonth = [];
    let expensesByMonth = [];
    let incomeByMonth = [];

    const transactionRef = collection(db, "budget", "2023", month);
    try {
      const res = await getDocs(transactionRef);
      if (res) {
        res.forEach((item) => {
          console.log(item.data());
          transactionsByMonth.push(item.data());

        })
        console.log(typeof transactionsByMonth);

        transactionsByMonth.forEach((transaction) => {
          if (transaction.type === 'expense') {
            expensesByMonth.push(transaction)
          } else {
            incomeByMonth.push(transaction)
          }

        });

        
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }

    console.log('expenses by month:',expensesByMonth);
    console.log('income by monthe:',incomeByMonth);
    return { expensesByMonth, incomeByMonth };
  }

  export async function loader() {
    const {expensesByMonth, incomeByMonth} = await showFirebaseDataByMonth("february");
    return defer({ expensesByMonth, incomeByMonth});
  }