import { Container, Table, Tab, Tabs, Dropdown } from "react-bootstrap";
import { months, years } from "./DateOptions";
import { useState, useEffect } from "react";
import BudgetForm from "./BudgetForm";
import AddBudgetCategory from "../AddBudgetCategory";
import getFunc from "./getBudgetEntries";
import { useSelector, useDispatch } from "react-redux";
import { budgetCategoryActions } from "../../store/budgetcategories";

const SetBudget = ({ expensesByMonth, incomeByMonth }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [fetchedIncomeCategories, setFetchedIncomeCategories] = useState([]);
  const [fetchedExpensesCategories, setFetchedExpensesCategories] = useState(
    []
  );

  console.log({ expensesByMonth, incomeByMonth });

  const dispatch = useDispatch();
  const isAddingBudgetCategory = useSelector(
    (state) => state.budgetCategory.isAddingBudgetCategory
  );

  const addBudgetCategoryHandler = () => {
    dispatch(budgetCategoryActions.addBudgetCategory());
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let categories = await getFunc();
        setFetchedIncomeCategories(categories.incomeCategories);
        setFetchedExpensesCategories(categories.expensesCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   setFetchedIncomeCategories(incomeByMonth.categories);
  //   setFetchedExpensesCategories(expensesByMonth.categories)
  // }, [incomeByMonth, expensesByMonth ]);

  const getIncomeTotal = () => {
    let incomeTotal = 0;
    incomeByMonth.forEach((income) => (incomeTotal += income.actual));
    return incomeTotal;
  };

  const getExpenseTotal = () => {
    let expenseTotal = 0;
    expensesByMonth.forEach((expense) => (expenseTotal += expense.actual));
    return expenseTotal;
  };

  const selectedYearHandler = (year) => {
    console.log(year.value);
    setSelectedYear(year.value);
  };

  const selectedMonthHandler = (month) => {
    setSelectedMonth(month.value);
  };


  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Year
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {years.map((year) => (
            <Dropdown.Item onClick={() => selectedYearHandler(year)}>
              {year.value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <br></br>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Month
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {months.map((month) => (
            <Dropdown.Item onClick={() => selectedMonthHandler(month)}>
              {month.value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Container>
        <BudgetForm />
        <p>
          Your budget for: {selectedMonth} {selectedYear}
        </p>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="income" title="Income">
            <p>Income</p>
            <p>Total: {getIncomeTotal()}$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Income Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {fetchedIncomeCategories.map((income) => (
                  <tr>
                    <td>{income["category_name"]}</td>
                    <td>{income["amount_expected"]}</td>
                    <td>N/A</td>
                  </tr>
                ))}

                {isAddingBudgetCategory && (
                  <tr>
                    <td>
                      <AddBudgetCategory />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                )}

                <tr>
                  <td>
                    <button onClick={addBudgetCategoryHandler}>
                      Select category
                    </button>
                  </td>

                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="expenses" title="Expenses">
            <p>Expenses</p>
            <p>Total spent: {getExpenseTotal()}$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Expense Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {fetchedExpensesCategories.map((expense) => (
                  <tr>
                    <td>{expense["category_name"]}</td>
                    <td>{expense["amount_expected"]}</td>
                    <td>N/A</td>
                  </tr>
                ))}
                {isAddingBudgetCategory && (
                  <tr>
                    <td>
                      <AddBudgetCategory />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                <tr>
                  <td>
                    <button onClick={addBudgetCategoryHandler}>
                      Select category
                    </button>
                  </td>

                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default SetBudget;
