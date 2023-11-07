import { useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const BudgetForm = () => {
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
        });
        console.log(typeof transactionsByMonth);

        transactionsByMonth.forEach((transaction) => {
          if (transaction.type === "expense") {
            expensesByMonth.push(transaction);
          } else {
            incomeByMonth.push(transaction);
          }
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }

    console.log("expenses by month:", expensesByMonth);
    console.log("income by month:", incomeByMonth);
  }

  return (
    <button onClick={() => showFirebaseDataByMonth("february")}>
      Click me to see firestore db
    </button>
  );
};

export default BudgetForm;
