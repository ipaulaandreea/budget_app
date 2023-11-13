import TrackingSheet from "../components/TrackingSheet/TrackingSheet";
import { useLoaderData, Await, defer } from "react-router-dom";
import axios from "axios";

const TrackingPage = () => {
  const { transactions } = useLoaderData();
  return (
    <>
      <Await resolve={transactions}>
        {(loadedTransactions) => (
          <TrackingSheet transactions={loadedTransactions} />
        )}
      </Await>
    </>
  );
};

export default TrackingPage;

async function getTransactions() {
  try {
    const response = await axios.get("http://localhost:5000/api/transactions");
    return response.data;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
}

export async function loader() {
  let transactions = await getTransactions();
  console.log(transactions);
  return defer({ transactions });
}
