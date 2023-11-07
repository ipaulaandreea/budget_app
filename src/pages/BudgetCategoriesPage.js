import { Container } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useLoaderData, Await, defer } from "react-router-dom";
import AddCategories from "../components/AddCategories/AddCategories";

const categoriesRef = collection(db, "categoriesUpdated");

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
  let categories = [];
  try {
    const res = await getDocs(categoriesRef);
    if (res) {
      res.forEach((item) => {
        console.log(item.data());
        categories.push(item.data());
      });
    }
    return categories;
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

export async function loader() {
  let categories = await getCategories();
  console.log(categories);
  return defer({ categories });
}
