
import {redirect} from 'react-router-dom'
import axios from 'axios'
import getCredentials from "../../Credentials";

 export const deleteCategory = async (id) => {
    let credentials = getCredentials();
        try {
            await axios.delete(`http://localhost:5000/api/deletecategory/${id}`,
            {withCredentials: true},
            {
              headers: {
                'Authorization': `Bearer ${credentials.getToken()}`,
                'Cookie': `${credentials.getRefreshTokenForHeader()}`
              }
            }
            );
            console.log('Delete request sent successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }


    
    return redirect("/budget-categories");


}

