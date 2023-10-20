import TrackingSheet from "../components/TrackingSheet/TrackingSheet";
import AddTransaction from "../components/AddTransaction";
import { useLoaderData, Await, defer } from 'react-router-dom';
import { db } from '../config/firebase'
import {getDocs, doc, setDoc, collection } from 'firebase/firestore'


const transactionsCollectionRef=collection(db,'transactions')

const TrackingPage = () => {
  const { transactions } = useLoaderData();
  return (
    <>
      {/* <AddTransaction /> */}
      <Await resolve={transactions}>
      {(loadedTransactions) =><TrackingSheet transactions = {loadedTransactions} />}
    </Await>
    </>
  );
};

export default TrackingPage;

async function getTransactions () {
  console.log('merge' )
  try {
    const querySnapshot  = await getDocs(transactionsCollectionRef)
    // console.log(docSnap.data() )
    const loadedTransactions = [];

    querySnapshot.forEach((doc) => {
      // You can access each document's data using doc.data()
      loadedTransactions.push(doc.data());
    });
    console.log(loadedTransactions)
    return loadedTransactions;
    // if (!response.ok) {
    //   throw new Error('Could not fetch transactions');
    // }
  } catch (error) {
    console.error('Error fetching transactions:', error);
   // Re-throw the error to handle it where you call getTransactions.

   
  }
  
}

export async function loader() {
  let transactions = await getTransactions();
  return defer({ transactions});
}
