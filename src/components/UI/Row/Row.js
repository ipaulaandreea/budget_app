import { defer, Form } from "react-router-dom";
import {onSnapshot, query, collection, where, addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";


const budgetRef = collection (db, "budget")
const categoriesRef = collection (db, "categoriesUpdated")


const Row = ({ method }) => {
  
  return (
 
      <Form method={method}>
      <input type="text" id="category" name="category" placeholder="Enter category name..."/>
      <input type="text" id="expected" name="expected" placeholder="Enter expected amount..."/>

      <button type="submit">Save</button>
      </Form>

  );
};

export default Row;

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

export async function action({ request, params, categoryData }) {
  const method = request.method;


  if (method === "POST") {
    try {
      const data = await request.formData();
      const categoryData = {
        name: data.get("category"),
        expected: data.get("expected")
      };

      console.log('categoryData', categoryData)


    } catch (error) {
      console.error(error);

    }
  }

  return null;
}