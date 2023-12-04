import { Container } from "react-bootstrap";
import SetBudget from "../components/SetBudget/SetBudget";
import { useLoaderData, Await, defer, redirect } from "react-router-dom";
import getBudgetEntries from '../components/SetBudget/getBudgetEntries'
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

function getRefreshToken(){
  const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === 'refreshToken') {
          return cookieValue;
        }
      }

}

export async function loader() {
  const refreshToken = getRefreshToken();

    if(!refreshToken){
        return redirect('/auth')
    } else {
      try{
        let budget  = await getBudgetEntries();
        console.log(budget)
        return defer({ expensesByMonth: budget.expensesCategories, incomeByMonth: budget.incomeCategories });
      } catch (error) {
        throw error;
        }
         
      }
    }
 

