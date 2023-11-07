import { Form } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { categoryActions } from "../../store/addcategoriestocategoriespage";
import { Table } from "react-bootstrap";
const categoriesRef = collection(db, "categoriesUpdated");


const AddCategories = (categories) => {
  const dispatch = useDispatch();
  const isAddingCategory = useSelector(
    (state) => state.category.isAddingCategory
  );

  const addCategoryHandler = () => {
    dispatch(categoryActions.addCategory());
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Budget Category</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {categories["categories"].map((category) => (
            <tr>
              <th>{category.category_name}</th>
              <th>{category.type}</th>
            </tr>
          ))}

          {isAddingCategory && (
            <tr>
              <td>
                <Form method="POST">
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    placeholder="Enter category name..."
                  />
                  <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Enter category type..."
                  />

                  <button type="submit">Save</button>
                  <button>Cancel</button>
                </Form>
              </td>
            </tr>
          )}
          <tr>
            <td>
              <button onClick={addCategoryHandler}>
                Create new category...
              </button>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default AddCategories;

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
