import { Form } from "react-router-dom";
import {onSnapshot, query, collection, where, addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";


const budgetRef = collection (db, "budget")



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