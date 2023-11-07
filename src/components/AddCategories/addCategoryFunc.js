import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const categoriesRef = collection(db, "categoriesUpdated");

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
  
  
  
    if (method === "POST") {
      const categoryData = {

        category_name: data.get("category_name"),
        type: data.get("type")
      };
  
      try {
        await addDoc(categoriesRef, categoryData);
      } catch (err) {
        console.log(err);
      }
    }
    return null;
}