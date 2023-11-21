import axios from 'axios';


export default async function getTransactionsByDate(year, month) {
    let transactionsByDate = [];

  
    try {
      const response = await axios.get("http://localhost:5000/api/transactions");
  
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
  