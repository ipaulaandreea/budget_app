import axios from "axios";
import getCredentials from "../../Credentials";


export default async function getAvailableCategories(month, year) {
  let budgetIncomeCategories = [];
  let budgetExpensesCategories = [];
if (month !== undefined && year !== undefined){
  try {
    let user = localStorage.getItem('user');
    let credentials = getCredentials();
    const response = await axios.get('http://localhost:5000/api/availablecategories', {

    params: { user, month, year },
  withCredentials: true,
  
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
  }

}
return { budgetExpensesCategories, budgetIncomeCategories };
}
