import axios from "axios";
import getCredentials from "../../Credentials";

export const updateActualAmount = async (transactionData, amountDifference) => {
  let category_name = transactionData.category_name;
  let amount = transactionData.amount;
  let month = transactionData.month;
  let year = transactionData.year;
  try {
    let credentials = getCredentials();
    let user = localStorage.getItem('user')
    let response = await axios.put(
      `http://localhost:5000/api/update-budget-amount`,
      { user, category_name, amount, month, year, amountDifference },
      { withCredentials: true },
      {
        headers: {
          Authorization: `Bearer ${credentials.getToken()}`,
          Cookie: `${credentials.getRefreshTokenForHeader()}`,
        },
      }
    );
    console.log("Amount updated:", response.data);
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
