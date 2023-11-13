import { Form, redirect } from "react-router-dom";
import { Form as RForm } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from 'axios';
import getCategories from '../../../components/SetBudget/getCategories'



const Row = ({ method }) => {


  const fetchedIncomeCategories = useSelector((state) => state.category.incomeCategories);
  const fetchedExpensesCategories = useSelector((state) => state.category.expensesCategories);
  console.log(fetchedExpensesCategories, fetchedIncomeCategories)

  const isAddingIncomeCategory = useSelector(
    (state) => state.budgetCategory.isAddingIncomeCategory
  );
  const isAddingExpensesCategory = useSelector(
    (state) => state.budgetCategory.isAddingExpensesCategory
  );


  return (
    <Form method={method}>
      <RForm.Select id="category" size="sm" placeholder="Select category">
        {isAddingIncomeCategory &&
          fetchedIncomeCategories.map((category) => (
            <option key="category_name" value={category["category_name"]}>
              {category["category_name"]}
            </option>
          ))}
        {isAddingExpensesCategory &&
          fetchedExpensesCategories.map((category) => (
            <option key="category_name" value={category["category_name"]}>
              {category["category_name"]}
            </option>
          ))}
      </RForm.Select>
      <input
        type="text"
        id="amount_expected"
        name="amount_expected"
        placeholder="Enter expected amount..."
      />

      <button type="submit">Save</button>
    </Form>
  );
};

export default Row;

// export async function action({ request, params, categoryData }) {
//   const method = request.method;
//   let categories = await getBudgetEntries();
//   let availableIncomeCategories = categories.incomeCategories;
//   let availableExpensesCategories = categories.expensesCategories;

//   if (method === "POST") {
//     const data = await request.formData();
//     var selectBox = document.getElementById("category");
//     var selectedValue = selectBox.value;
//     let foundIncomeCategory = availableIncomeCategories.find(
//       (category) => category.category_name === selectedValue
//     );
//     let foundExpenseCategory = availableExpensesCategories.find(
//       (category) => category.category_name === selectedValue
//     );
//     if (foundIncomeCategory) {
//       const categoryData = {
//         category_name: selectedValue,
//         amount_expected: data.get("amount_expected"),
//         category_type: "income",
//         month: 1,
//         year: 2023,
//       };


      
//       try {
//         await addDoc(budgetRef, categoryData);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     if (foundExpenseCategory) {
//       const categoryData = {
//         category_name: selectedValue,
//         amount_expected: data.get("amount_expected"),
//         category_type: "expense",
//         month: 1,
//         year: 2023,
//       };

//       try {
//         await addDoc(budgetRef, categoryData);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   return redirect("/set-budget");
// }

export async function action({ request, params }) {
  const method = request.method;
  let {expensesCategories, incomeCategories} = await getCategories();
  const data = await request.formData();
  const categoryData = {
    category_name: data.get("category_name"),
    amount_expected: data.get("amount_expected"),
    type: "income",
    month: 1,
    year: 2023,
    amount_actual: 0,
  };

  if (method === "POST") {
    try {
    //   var selectBox = document.getElementById("category_name");
    // var selectedValue = selectBox.value;
    // let foundIncomeCategory = availableIncomeCategories.find(
    //   (category) => category.category_name === selectedValue
    // );
    // let foundExpenseCategory = availableExpensesCategories.find(
    //   (category) => category.category_name === selectedValue
    // );
    // if (foundIncomeCategory) {

      const response = await axios.post('http://localhost:5000/api/addbudgetentry', {categoryData});
      console.log('New category created:', response.data);
    
    } catch (error) {
      console.error('Error creating post:', error);
    }
  
  }
  return redirect("/set-budget");
  
}
