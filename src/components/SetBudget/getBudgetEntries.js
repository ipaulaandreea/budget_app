import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.js";

const budgetRef = collection(db, "budgetUpdatedVersion");

export default async function getFunc() {
  let incomeCategories = [];
  let expensesCategories = [];
  try {
    let res = await getDocs(budgetRef);
    if (res) {
      res.forEach((item) => {
        console.log(item.data());
        if (item.data()["category_type"] === "income") {
          incomeCategories.push(item.data());
        } else {
          expensesCategories.push(item.data());
        }
      });
    }
    console.log(expensesCategories, incomeCategories)
    return { expensesCategories, incomeCategories };

  } catch (error) {
    console.error("Error getting document:", error);
  }

}
