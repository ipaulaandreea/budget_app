import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.js";

const categoriesRef = collection(db, "categoriesUpdated");

export default async function getFunc() {
  let incomeCategories = [];
  let expensesCategories = [];
  try {
    const res = await getDocs(categoriesRef);
    if (res) {
      res.forEach((item) => {
        console.log(item.data());
        if (item.data()["type"] === "income") {
          incomeCategories.push(item.data());
        } else {
          expensesCategories.push(item.data());
        }
      });
    }
    return { expensesCategories, incomeCategories };
  } catch (error) {
    console.error("Error getting document:", error);
  }
}