import {redirect} from 'react-router-dom'
import axios from 'axios'
 const deleteTransaction = async (id) => {
    console.log(id)
    let message = window.confirm('Are you sure?')
    if (message){
        try {
            await axios.delete(`http://localhost:5000/api/deletetransaction/${id}`);
            console.log('Delete request sent successfully');
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }


    }
    return redirect("/tracker");


}

export default deleteTransaction;


