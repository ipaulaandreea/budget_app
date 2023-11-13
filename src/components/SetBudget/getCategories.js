import axios from 'axios';

export default async function getCategories() {
  let incomeCategories = [];
  let expensesCategories = [];

  try {
    let res = await axios.get("http://localhost:5000/api/getcategories");
    if (res.data) {
      res['data'].forEach((item) => { 
        if (item["type"] === "income") {
          incomeCategories.push(item);
        } else {
          expensesCategories.push(item);
        }
      });
    }
    console.log(expensesCategories, incomeCategories)
    return { expensesCategories, incomeCategories };
  } catch (error) {
    console.error("Error getting document:", error);
  }
}
