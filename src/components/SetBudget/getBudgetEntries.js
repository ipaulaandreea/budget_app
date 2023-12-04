import axios from "axios";
import getCredentials from "../../Credentials";
import {redirect} from 'react-router-dom';

export default async function getBudgetEntries(month, year) {
  let budgetIncomeCategories = [];
  let budgetExpensesCategories = [];
if (month !== undefined && year !== undefined){
  try {
    let credentials = getCredentials();
    const response = await axios.get('http://localhost:5000/api/budget', {month, year},
  {withCredentials: true},
  {
    headers: {
      'Authorization': `Bearer ${credentials.getToken()}`,
      'Cookie': `${credentials.getRefreshTokenForHeader()}`
    }
  })

    if (response.data) {
      response["data"].forEach((item) => {
        if (item["type"] === "income") {
          budgetIncomeCategories.push(item);
        } else {
          budgetExpensesCategories.push(item);
        }
      });
    }

  } catch (error) {
    
    console.error("Error getting budget:", error);
    throw error;
    // return redirect("/auth?mode=login");
  }

}
return { budgetExpensesCategories, budgetIncomeCategories };
}
