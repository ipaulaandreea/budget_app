import { Container } from "react-bootstrap";
import { useLoaderData, Await, defer } from "react-router-dom";
import AddCategories from "../components/AddCategories/AddCategories";
import axios from 'axios';

const BudgetCategoriesPage = () => {
  const categories = useLoaderData();
  console.log(categories);

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
  try {
    let response = await axios.get('http://localhost:5000/api/getcategories');
    return response.data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}


export async function loader() {
  let categories = await getCategories();
  return defer({ categories });
}
