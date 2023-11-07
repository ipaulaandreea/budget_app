import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home'
import TrackingPage,  { loader as transactionsLoader } from './pages/TrackingPage'
import RootLayout from './pages/Root';
import BudgetPlannerPage from './pages/BudgetPlanner'
import InstructionsPage from './pages/Instructions'
import BudgetSetterPage, {loader as budgetSettingLoader} from './pages/BudgetSetter'
import { action as manipulateExpenseAction } from './components/TrackingForm/TrackingForm';
import { action as addNewCategoryAction } from './components/UI/Row/Row'
import BudgetCategoriesPage from './pages/BudgetCategoriesPage'
// import { loader as fetchCategoriesLoader} from './pages/BudgetCategoriesPage'
import {loader as addCategoryLoader} from './pages/BudgetCategoriesPage'
import {action as addCategoryToDbAction} from './components/AddCategories/addCategoryFunc'
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {path: 'tracker', element: <TrackingPage />, loader: transactionsLoader, action: manipulateExpenseAction},

        {path: 'budget-planner', element: <BudgetPlannerPage/>},
        
        {path: 'set-budget', element: <BudgetSetterPage/>, loader: budgetSettingLoader, action: addNewCategoryAction},
        {path: 'instructions', element: <InstructionsPage/>},
        {path: 'budget-categories', element: <BudgetCategoriesPage/>, loader: addCategoryLoader, action: addCategoryToDbAction}

      ]}])
      return <RouterProvider router={router} />;
  
}

export default App;
