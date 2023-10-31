import {
  Container,
  Dropdown,
  Form,
  InputGroup,
  Table,
  Tab,
  Tabs,
} from "react-bootstrap";
import { months, years } from "./DateOptions";
import { useState } from "react";
import Row from "../UI/Row/Row";
import BudgetForm from "./BudgetForm";
import AddBudgetCategory from '../AddBudgetCategory'

const SetBudget = ({ expensesByMonth, incomeByMonth }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  
  console.log({ expensesByMonth, incomeByMonth });
  

  
  const getIncomeTotal = () => {
    let incomeTotal = 0;
    incomeByMonth.forEach((income) =>
    incomeTotal+=income.actual
    )
    return incomeTotal;
  }

  const getExpenseTotal = () => {
    let expenseTotal = 0;
    expensesByMonth.forEach((expense) =>
    expenseTotal+=expense.actual
    )
    return expenseTotal;
  }

  const selectedYearHandler = (year) => {
    console.log(year.value);
    setSelectedYear(year.value);
  };

  const selectedMonthHandler = (month) => {
    setSelectedMonth(month.value);
  };

  const addIncomeCategoryHandler = () => {
    const newIncomeCategory = {
      name: "new",
      expected: "0",
      actual: "0",
    };

    setIncomeCategories((prevState) => [...prevState, newIncomeCategory]);
  };

  const addExpenseCategoryHandler = () => {
    const newExpenseCategory = {
      name: "new",
      expected: "0",
      actual: "0",
    };

    setExpenseCategories((prevState) => [...prevState, newExpenseCategory]);
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
            <p>Total earned: {getIncomeTotal()}$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Income Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {incomeByMonth.map((income) => (
                  <tr>
                    <td>{income.name}</td>
                    <td>{income.expected}</td>
                    <td>{income.actual}</td>
                  </tr>
                ))}
                {incomeCategories.map((category) => (
                <tr>
                  <td>
                  <AddBudgetCategory />
                  </td>
                  <td></td>
                  <td></td>
                  </tr>
                 
                ))}

                <tr>
                  <td>
                    <button onClick={addIncomeCategoryHandler}>
                      Create new category...
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
                {expensesByMonth.map((expense) => (
                  <tr>
                    <td>{expense.name}</td>
                    <td>{expense.expected}</td>
                    <td>{expense.actual}</td>
                  </tr>
                ))}
                {expenseCategories.map((category) => (
                  <AddBudgetCategory />
                ))}
                <tr>
                  <td>
                    <button onClick={addExpenseCategoryHandler}>
                      Create new category...
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
