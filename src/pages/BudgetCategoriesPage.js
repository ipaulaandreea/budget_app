import { Container } from "react-bootstrap";
import { useLoaderData, Await, defer, redirect } from "react-router-dom";
import AddCategories from "../components/AddCategories/AddCategories";
import axios from 'axios';
import getCredentials from "../Credentials";


const BudgetCategoriesPage = () => {
  const categories = useLoaderData();

  return (
    <Await resolve={categories}>
      {(loadedCategories) => (
        <Container>
          <AddCategories categories={loadedCategories.categories} />
        </Container>
      )}
    </Await>
  );
};

export default BudgetCategoriesPage;

export async function getCategories() {
  let credentials = getCredentials();
  let user = localStorage.getItem('user')
   let response = await axios.get(`http://localhost:5000/api/getcategories?user=${user}`, 
  // let response = await axios.get('http://localhost:5000/api/getcategories', 
  {withCredentials: true},
  {
    headers: {
      'Authorization': `Bearer ${credentials.getToken()}`,
      'Cookie': `${credentials.getRefreshTokenForHeader()}`
    }
  });
  return response.data;
}


export async function loader() {
  try {
    let categories = await getCategories();
    return defer({ categories });
  } catch (error) {
    return redirect("/auth?mode=login");
  }
}
