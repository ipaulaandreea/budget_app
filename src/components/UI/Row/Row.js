import { Form, redirect } from "react-router-dom";
import { Form as RForm } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import getCategories from '../../../components/SetBudget/getCategories'
import { budgetCategoryActions } from '../../../store/budgetcategories'

const Row = ({ method }) => {
  
  const dispatch = useDispatch();
  const fetchedIncomeCategories = useSelector((state) => state.category.incomeCategories);
  const fetchedExpensesCategories = useSelector((state) => state.category.expensesCategories);
  const selectedMonth = useSelector((state) => state.budgetItem.selectedMonth);
  const selectedYear = useSelector((state) => state.budgetItem.selectedYear);

  const isAddingIncomeCategory = useSelector(
    (state) => state.budgetCategory.isAddingIncomeCategory
  );
  const isAddingExpensesCategory = useSelector(
    (state) => state.budgetCategory.isAddingExpensesCategory
  );

  const hideRowHandler = () => {
    dispatch(budgetCategoryActions.cancelAdding());
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let method = "POST"
    await action({
      request: event,
      params: { selectedMonth, selectedYear,method },
    });
  };

  return (
    <Form method={method} onSubmit = {handleSubmit} >
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
      <button onClick = {hideRowHandler}>Cancel</button>
    </Form>
  );
};

export default Row;

export async function action({ request, params }) {
  const method = params.method;
  const selectedMonth = params.selectedMonth;
  const selectedYear = params.selectedYear;
  let categories = await getCategories();
  const mergedCategories = [
    ...categories.incomeCategories,
    ...categories.expensesCategories,
  ];
   var selectBox = document.getElementById("category");
   var selectedValue = selectBox.value;
    let foundCategory = mergedCategories.filter(
      (category) => category['category_name'] === selectedValue
    );

  // const data = await request.formData();
  var amount_expected = document.getElementById("amount_expected");


  const categoryData = {
    category_name: selectedValue,
    amount_expected: parseInt(amount_expected.value),
    type: foundCategory[0]['type'] ,
    month: selectedMonth,
    year: selectedYear,
    amount_actual: 0,
  };


  if (method === "POST") {
    try {

      const response = await axios.post('http://localhost:5000/api/addbudgetentry', {categoryData});
      console.log('New category created:', response.data);
    
    } catch (error) {
      console.error('Error creating post:', error);
    }
  
  }
  return redirect("/set-budget");
  
}
