import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home'
import TrackingPage,  { loader as transactionsLoader } from './pages/TrackingPage'
import RootLayout from './pages/Root';
import BudgetPlannerPage from './pages/BudgetPlanner'
import InstructionsPage from './pages/Instructions'
import { action as manipulateExpenseAction } from './components/TrackingForm/TrackingForm';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {path: 'tracker', element: <TrackingPage />, loader: transactionsLoader, action: manipulateExpenseAction},

        {path: 'budget', element: <BudgetPlannerPage/>},
        {path: 'instructions', element: <InstructionsPage/>}

      ]}])
      return <RouterProvider router={router} />;
  
}

export default App;
