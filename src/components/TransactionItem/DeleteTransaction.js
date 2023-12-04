import {redirect} from 'react-router-dom'
import axios from 'axios'
import getCredentials from "../../Credentials";

 const deleteTransaction = async (id) => {
    console.log(id)

        try {
            let credentials = getCredentials();
            await axios.delete(`http://localhost:5000/api/deletetransaction/${id}`,
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
            console.error('Error deleting transaction:', error);
        }


    
    return redirect("/tracker");


}

export default deleteTransaction;


