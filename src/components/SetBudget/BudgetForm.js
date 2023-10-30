import { useState } from "react";

import { Form, useNavigate, useActionData, redirect } from "react-router-dom";

import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import store from "../../store/index";

import { useDispatch } from "react-redux";

const BudgetForm = () => {
  async function showDataFromFirebase() {
    let transactionsByMonth = [];
    let expensesByMonth = [];
    let incomeByMonth = [];

    const transactionRef = collection(db, "budget", "2023", "february");
    try {
      const res = await getDocs(transactionRef);
      if (res) {
        res.forEach((item) => {
          console.log(item.data());
          transactionsByMonth.push(item.data());
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
    return transactionsByMonth;
  }

  return (
    <button onClick={showDataFromFirebase}>Click me to see firestore db</button>
  );
};

// export async function getBudgetCategoriesByYear (year) {

//     const docRef = doc(budgetCollectionRef, '2023');
//     const docSnap = await getDoc(docRef);
//     console.log(docSnap.data())
// }

export default BudgetForm;
