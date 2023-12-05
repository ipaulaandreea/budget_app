import axios from 'axios';
import getCredentials from "../../Credentials";

export default async function getTransactionsByDate(year, month) {
    let transactionsByDate = [];

  
    try {
      let user = localStorage.getItem('user');
      let credentials = getCredentials();
      const response = await axios.get(`http://localhost:5000/api/transactions?user=${user}`,
      {withCredentials: true},
      {
        headers: {
          'Authorization': `Bearer ${credentials.getToken()}`,
          'Cookie': `${credentials.getRefreshTokenForHeader()}`
        }});
  
      if (response.data) {
        response["data"].forEach((item) => {
          if (item["year"] === year && item["month"] === month) {
            transactionsByDate.push(item);
          } 
        });
      }
      return transactionsByDate;
    } catch (error) {
      console.error("Error getting budget:", error);
      throw error;
    }
  }
  