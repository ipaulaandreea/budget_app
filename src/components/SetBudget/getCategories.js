import axios from 'axios';
import getCredentials from "../../Credentials";
export default async function getCategories() {
  let incomeCategories = [];
  let expensesCategories = [];

  try {
    let credentials = getCredentials();
  let user =localStorage.getItem('user');
    let res = await axios.get(`http://localhost:5000/api/getcategories?user=${user}`, 
    {withCredentials: true},
  {
    headers: {
      'Authorization': `Bearer ${credentials.getToken()}`,
      'Cookie': `${credentials.getRefreshTokenForHeader()}`
    }
  }
    );
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
