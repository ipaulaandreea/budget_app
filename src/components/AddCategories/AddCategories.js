import { Form } from "react-router-dom";
import {useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { categoryActions, fetchCategories } from "../../store/addcategoriestocategoriespage";
import { Table } from "react-bootstrap";
import {deleteCategory} from '../../components/AddCategories/deleteCategoryFunc'
import {action as addCategoryFunc} from '../../components/AddCategories/addCategoryFunc'
const AddCategories = (categories) => {

  const [categoriesState, setCategoriesState] = useState(categories.categories);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const isAddingCategory = useSelector(
    (state) => state.category.isAddingCategory
  );

  const addCategoryHandler = async () => {
    dispatch(categoryActions.addCategory());
    await dispatch(fetchCategories());
  };

  const saveHandler = async (event, params ) => {
      const formData = new FormData(formRef.current);
      const categoryData = {
        type: formData.get("type"),
        category_name: formData.get("category_name"),
      };
      setCategoriesState((prevState => {
        return [...prevState, categoryData]
      }))
      console.log('state: ', categoriesState)
  }


  const cancelAddingHandler = () => {
    dispatch(categoryActions.cancelAdding())
  }


  const deleteHandler = async (id) => {
    let message = window.confirm('Are you sure?')
    if (message){
    await deleteCategory(id);


    
    setCategoriesState(categoriesState.filter(
        (category) => category["_id"] !== id
      ),
    );
    
  };
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Budget Category</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesState.map((category) => (
            <tr>
              <th>{category.category_name}</th>
              <th>{category.type}</th>
              <th>
                <button onClick = {() => deleteHandler(category["_id"])}>Delete</button>
              </th>
            </tr>
          ))}

          {isAddingCategory && (
            <tr>
              <td>
                <Form method="POST" ref={formRef} onSubmit={saveHandler} >
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

                  <button type = 'submit'>Save</button>
                  <button onClick = {cancelAddingHandler}>Cancel</button>
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

