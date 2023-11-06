import {
    doc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "../../config/firebase.js";

  
  
  const categoriesRef = collection (db, "budgetUpdatedVersion")

export default async function getFunc() {
    let categories = []
    let incomeCategories = []
    let expensesCategories = []
    try {
      const res = await getDocs(categoriesRef);
    //   if (res) {
    //     res.forEach((item) => {
    //       console.log(item.data());
    //       categories.push(item.data());
    
    //     })
    //   }

      if (res) {
        res.forEach((item) => {
            console.log(item.data());
            if (item.data()['category_type'] === 'income'){
                incomeCategories.push(item.data());
            } else {
                expensesCategories.push(item.data())
            }
            
      
          })
      }

      return {expensesCategories, incomeCategories}
    }
   catch (error) {
    console.error("Error getting document:", error);
  }
  }