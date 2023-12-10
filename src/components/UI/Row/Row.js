import { Form, redirect } from "react-router-dom";
import { Form as RForm } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {useState, useEffect} from 'react'
import axios from "axios";
import getCategories from "../../../components/SetBudget/getCategories";
import { budgetCategoryActions } from "../../../store/budgetcategories";
import { fetchBudgetEntries } from "../../../store/budgetItems";
import {fetchCategories} from '../../../store/addcategoriestocategoriespage'
import getCredentials from "../../../Credentials";

const Row = ({ method }) => {

  const dispatch = useDispatch();
  const fetchedIncomeCategories = useSelector(
    (state) => state.category.incomeCategories
  );
  const fetchedExpensesCategories = useSelector(
    (state) => state.category.expensesCategories
  );
  const selectedMonth = useSelector((state) => state.budgetItem.selectedMonth);
  const selectedYear = useSelector((state) => state.budgetItem.selectedYear);
  
  const [availableIncomeCategories, setAvailableIncomeCategories] = useState([]);
  const [availableExpensesCategories, setAvailableExpensesCategories] = useState([]);

  const isAddingIncomeCategory = useSelector(
    (state) => state.budgetCategory.isAddingIncomeCategory
  );
  const isAddingExpensesCategory = useSelector(
    (state) => state.budgetCategory.isAddingExpensesCategory
  );

  const hideRowHandler = () => {
    dispatch(budgetCategoryActions.cancelAdding());
  };

  const usedIncomeEntries = useSelector((state)=>state.budgetItem.incomeBudgetEntries)
  const usedExpensesEntries = useSelector((state)=>state.budgetItem.expensesBudgetEntries)

  const getAvailableBudgetCategories = (usedIncomeEntries, usedExpensesEntries) => {
    const usedIncomeCategoryNames = usedIncomeEntries.map(entry => entry['category_name']);
    const availableIncomeCategories = fetchedIncomeCategories.filter(category =>
      !usedIncomeCategoryNames.includes(category['category_name'])
    );
    const usedExpensesCategoryNames = usedExpensesEntries.map(entry => entry['category_name']);
    const availableExpensesCategories = fetchedExpensesCategories.filter(category =>
      !usedExpensesCategoryNames.includes(category['category_name'])
    );
    return {availableIncomeCategories, availableExpensesCategories};
  }
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    let method = "POST";
    var selectBox = document.getElementById("category");
    var selectedValue = selectBox.value;
    let incomeCategory = fetchedIncomeCategories.filter(
      (category) => category["category_name"] === selectedValue
    );
    let expenseCategory = fetchedExpensesCategories.filter(
      (category) => category["category_name"] === selectedValue
    );

    if (incomeCategory.length>0) {
      // setUsedIncomeCategories(prevState => [...prevState, ...incomeCategory]);
      dispatch(budgetCategoryActions.addIncomeCategory());
    }
  
    if (expenseCategory.length>0) {
      // setUsedExpensesCategories(prevState => [...prevState, ...expenseCategory]);
      dispatch(budgetCategoryActions.addExpenseCategory());
    }

    
    await action({
      request: event,
      params: { selectedMonth, selectedYear, method },
    });
    hideRowHandler();


    await dispatch(
      fetchBudgetEntries({ month: selectedMonth, year: selectedYear })
    );
  };


  useEffect(() => {

    dispatch(fetchCategories());
  }, [dispatch, isAddingIncomeCategory, isAddingExpensesCategory]);

  useEffect(() => {

    const { availableIncomeCategories, availableExpensesCategories } = getAvailableBudgetCategories(usedIncomeEntries, usedExpensesEntries);
    setAvailableIncomeCategories(availableIncomeCategories);
    setAvailableExpensesCategories(availableExpensesCategories);
    console.log('availableIncomeCategories, availableExpensesCategories', availableIncomeCategories, availableExpensesCategories)
  }, [usedIncomeEntries, usedExpensesEntries]);





  return (
    <Form method={method} onSubmit={handleSubmit}>
<RForm.Select id="category" size="sm" placeholder="Select category">
  {isAddingIncomeCategory &&
    availableIncomeCategories.map((category) => (
      <option
        key={category["category_name"]}
        value={category["category_name"]}
        
      >
        {category["category_name"]}
      </option>
    ))}
  {isAddingExpensesCategory &&
    availableExpensesCategories.map((category) => (
      <option
        key={category["category_name"]}
        value={category["category_name"]}
       
      >
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
      <button onClick={hideRowHandler}>Cancel</button>
    </Form>
  );
};

export default Row;

export async function action({ request, params }) {
  let user = localStorage.getItem('user');
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
    (category) => category["category_name"] === selectedValue
  );

  var amount_expected = document.getElementById("amount_expected");

  const categoryData = {
    user: user,
    category_name: selectedValue,
    amount_expected: parseInt(amount_expected.value),
    type: foundCategory[0]["type"],
    month: selectedMonth,
    year: selectedYear,
    amount_actual: 0,
  };

  if (method === "POST") {
    let credentials = getCredentials();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addbudgetentry", 
        { categoryData },  
        {withCredentials: true},
        {
          headers: {
            'Authorization': `Bearer ${credentials.getToken()}`,
            'Cookie': `${credentials.getRefreshTokenForHeader()}`
          }
        }
      );
      console.log("New category created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  return redirect("/set-budget");
}
