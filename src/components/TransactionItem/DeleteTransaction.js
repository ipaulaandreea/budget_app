
import { doc, deleteDoc } from 'firebase/firestore'
import {db} from '../../config/firebase'
import {redirect} from 'react-router-dom'

 const deleteTransaction = async (id) => {
    console.log(id)
    const transactionDoc = doc(db, 'transactions', id)
    let message = window.confirm('Are you sure')
    // window.alert("Are you sure");
    if (message){
        await deleteDoc (transactionDoc)
        return redirect("/tracker");
 
    }



}

export default deleteTransaction;


