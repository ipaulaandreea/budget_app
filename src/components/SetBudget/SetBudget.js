import { Container, Table, Tab, Tabs, Dropdown } from "react-bootstrap";
import { months, years } from "./DateOptions";
import { useState } from "react";


import AddBudgetCategory from "../AddBudgetCategory";

import { useSelector, useDispatch } from "react-redux";
import { budgetCategoryActions } from "../../store/budgetcategories";

const SetBudget = ({ expensesByMonth, incomeByMonth }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const incomeEntries = useSelector((state) => state.budgetItem.incomeBudgetEntries);
  const expensesEntries = useSelector((state) => state.budgetItem.expensesBudgetEntries);

  // console.log({ expensesByMonth, incomeByMonth });

  const dispatch = useDispatch();

  const isAddingIncomeCategory = useSelector(
    (state) => state.budgetCategory.isAddingIncomeCategory
  );
  const isAddingExpensesCategory = useSelector(
    (state) => state.budgetCategory.isAddingExpensesCategory
  );

  const addIncomeCategoryHandler = () => {
    dispatch(budgetCategoryActions.addIncomeCategory());
  };

  const addExpenseCategoryHandler = () => {
    dispatch(budgetCategoryActions.addExpenseCategory());
  };
  

  // const getIncomeTotal = () => {
  //   let incomeTotal = 0;
  //   incomeByMonth.forEach((income) => (incomeTotal += income.actual));
  //   return incomeTotal;
  // };

  // const getExpenseTotal = () => {
  //   let expenseTotal = 0;
  //   expensesByMonth.forEach((expense) => (expenseTotal += expense.actual));
  //   return expenseTotal;
  // };

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
            <p>Total: ''$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Income Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {incomeEntries.map((income) => (
                  <tr>
                    <td>{income["category_name"]}</td>
                    <td>{income["amount_expected"]}</td>
                    <td>{income["amount_actual"]}</td>
                  </tr>
                ))}

                {isAddingIncomeCategory && (
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
                    <button onClick={addIncomeCategoryHandler}>
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
            <p>Total spent: '"$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Expense Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {expensesEntries.map((expense) => (
                  <tr>
                    <td>{expense["category_name"]}</td>
                    <td>{expense["amount_expected"]}</td>
                    <td>{expense["amount_actual"]}</td>
                  </tr>
                ))}
                {isAddingExpensesCategory && (
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
                    <button onClick={addExpenseCategoryHandler}>
                      Add a new expense category for this month's budget
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
