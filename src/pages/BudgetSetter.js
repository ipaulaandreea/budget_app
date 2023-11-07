import { Container } from "react-bootstrap";
import SetBudget from "../components/SetBudget/SetBudget";
import { Form, useNavigate, useActionData, redirect } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useLoaderData, Await, defer } from "react-router-dom";
import getFunc from '../components/SetBudget/getBudgetEntries'
const BudgetSetterPage = () => {
  const { expensesByMonth, incomeByMonth } = useLoaderData();
  return (
    <Await resolve={[expensesByMonth, incomeByMonth]}>
      {([loadedExpenses, loadedIncome]) => (
        <Container>
          <h3>Set your budget </h3>
          <SetBudget
            expensesByMonth={loadedExpenses}
            incomeByMonth={loadedIncome}
          />
        </Container>
      )}
    </Await>
  );
};

export default BudgetSetterPage;

export async function loader() {
  let budget  = await getFunc();
  return defer({ expensesByMonth: budget.expensesCategories, incomeByMonth: budget.incomeCategories });
}
