import axios from "axios";

export default async function getBudgetEntries() {
  let budgetIncomeCategories = [];
  let budgetExpensesCategories = [];

  try {
    const response = await axios.get("http://localhost:5000/api/budget");

    if (response.data) {
      response["data"].forEach((item) => {
        if (item["type"] === "income") {
          budgetIncomeCategories.push(item);
        } else {
          budgetExpensesCategories.push(item);
        }
      });
    }
    return { budgetExpensesCategories, budgetIncomeCategories };
  } catch (error) {
    console.error("Error getting budget:", error);
    throw error;
  }
}
