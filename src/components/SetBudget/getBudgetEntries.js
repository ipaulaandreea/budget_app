import axios from "axios";

export default async function getBudgetEntries(month, year) {
  let budgetIncomeCategories = [];
  let budgetExpensesCategories = [];
if (month !== undefined && year !== undefined){
  try {
    // const response = await axios.get(`http://localhost:5000/api/budget?month=${month}&year=${year}`);
    const response = await axios.get('http://localhost:5000/api/budget', {month, year});
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
