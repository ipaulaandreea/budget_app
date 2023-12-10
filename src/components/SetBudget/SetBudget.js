import { Container, Table, Tab, Tabs, Dropdown } from "react-bootstrap";
import { months, years } from "./DateOptions";
import { useState, useEffect } from "react";
import AddBudgetCategory from "../AddBudgetCategory";
import { useSelector, useDispatch } from "react-redux";
import { budgetCategoryActions } from "../../store/budgetcategories";
import { fetchBudgetEntries } from "../../store/budgetItems";
import { budgetItemActions } from "../../store/budgetItems";

const SetBudget = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [incomeEntriesState, setIncomeEntriesState] = useState([]);
  const [expensesEntriesState, setExpensesEntriesState] = useState([]);

  const incomeEntries = useSelector(
    (state) => state.budgetItem.incomeBudgetEntries
  );
  const expensesEntries = useSelector(
    (state) => state.budgetItem.expensesBudgetEntries
  );

  const dispatch = useDispatch();

  const isAddingIncomeCategory = useSelector(
    (state) => state.budgetCategory.isAddingIncomeCategory
  );
  const isAddingExpensesCategory = useSelector(
    (state) => state.budgetCategory.isAddingExpensesCategory
  );


  const compareStates = () => {
    let newIncomeEntry = incomeEntries.filter(incomeEntry =>
      !incomeEntriesState.some(prevIncomeEntry => prevIncomeEntry['_id'] === incomeEntry['_id'])
    );
  
    if (newIncomeEntry.length > 0) {
      setIncomeEntriesState((prevIncomeEntries) => [
        ...prevIncomeEntries,
        ...newIncomeEntry,
      ]);
    }

    let newExpenseEntry = expensesEntries.filter(expenseEntry =>
      !expensesEntriesState.some(prevExpensesEntry => prevExpensesEntry['_id'] === expenseEntry['_id'])
    );
  
    if (newExpenseEntry.length > 0) {
      setIncomeEntriesState((prevExpensesEntries) => [
        ...prevExpensesEntries,
        ...newExpenseEntry,
      ]);
    }
  };


  const addIncomeCategoryHandler = async () => {
    dispatch(budgetCategoryActions.addIncomeCategory());
    await dispatch(fetchBudgetEntries({ month: selectedMonth, year: selectedYear }));
    compareStates();
  };
  
  const addExpenseCategoryHandler = async () => {
    dispatch(budgetCategoryActions.addExpenseCategory());
    await dispatch(fetchBudgetEntries({ month: selectedMonth, year: selectedYear }));
    compareStates();
  };

  

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchBudgetEntries({ month: selectedMonth, year: selectedYear }));
    };
    fetchData();
  

  }, [dispatch, selectedMonth, selectedYear]);

  useEffect(() => {
    setIncomeEntriesState(incomeEntries);
  }, [incomeEntries]);

  useEffect(() => {
    setExpensesEntriesState(expensesEntries);
  }, [expensesEntries]);



  const selectedYearHandler = (year) => {
    setSelectedYear(year.value);
    dispatch(budgetItemActions.selectYear(year.value));
    dispatch(fetchBudgetEntries({ month: selectedMonth, year: year.value }));
    if (selectedYear !==null & selectedMonth !== null){
      setIncomeEntriesState(incomeEntries)
      setExpensesEntriesState(expensesEntries)
    }
  };

  const selectedMonthHandler = (month) => {
    setSelectedMonth(month.value);
    dispatch(budgetItemActions.selectMonth(month.value));
    dispatch(fetchBudgetEntries({ month: month.value, year: selectedYear }));
    if (selectedYear !==null & selectedMonth !== null){
      setIncomeEntriesState(incomeEntries)
      setExpensesEntriesState(expensesEntries)
    }
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomeEntriesState && (incomeEntriesState.map((income) => (
                  <tr>
                    <td>{income["category_name"]}</td>
                    <td>{income["amount_expected"]}</td>
                    <td>{income["amount_actual"]}</td>
                    <td>
                      {/* <button>Edit</button> */}
                    
                    </td>
                  </tr>
                )))}

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
                {expensesEntriesState && (expensesEntriesState.map((expense) => (
                  <tr>
                    <td>{expense["category_name"]}</td>
                    <td>{expense["amount_expected"]}</td>
                    <td>{expense["amount_actual"]}</td>
                  </tr>
                )))}
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
                      Add a new expense category
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
