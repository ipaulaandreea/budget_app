import {
    Container,
    Dropdown,
    Form,
    InputGroup,
    Table,
    Tab,
    Tabs,
  } from "react-bootstrap";

import AddBudgetCategory from '../components/AddBudgetCategory'

import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useLoaderData, Await, defer } from 'react-router-dom';


const categoriesRef = collection (db, "categoriesUpdated")





const BudgetCategoriesPage = () => {
  const { categories } = useLoaderData();
return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Budget Category</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category) => (
        <tr>
         <th>{category.category_name}</th>
         <th>{category.type}</th>
         </tr>
      )
      )
      }
        </tbody>
        <tr>

        </tr>
        </Table>
)



}

export default BudgetCategoriesPage;

export async function getCategories() {
  let categories = []
  try {
    const res = await getDocs(categoriesRef);
    if (res) {
      res.forEach((item) => {
        console.log(item.data());
        categories.push(item.data());
  
      })
    }
    return categories;
  }
 catch (error) {
  console.error("Error getting document:", error);
}
}

export async function loader() {
  const categories = await getCategories();
  return defer({categories});
}