
import {redirect} from 'react-router-dom'
import axios from 'axios'
 export const deleteCategory = async (id) => {
    console.log(id)
//ai grija sa nu fie deja used acea categorie intr un budget;
        try {
            await axios.delete(`http://localhost:5000/api/deletecategory/${id}`);
            console.log('Delete request sent successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }


    
    return redirect("/budget-categories");


}

