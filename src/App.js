import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home'
import RootLayout from './pages/Root';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },

      ]}])
      return <RouterProvider router={router} />;
  
}

export default App;
