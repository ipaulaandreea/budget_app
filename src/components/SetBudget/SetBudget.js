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
import BudgetForm from './BudgetForm'

const SetBudget = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  // console.log(selectedYear)

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
        <BudgetForm/>
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
            <p>Total: 100$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Income Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {incomeCategories.map((category) => (
                  <Row />
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
            <p>Left to allocate: 15$</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Expense Category</th>
                  <th>Expected</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
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
