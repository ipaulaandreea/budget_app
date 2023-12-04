import TrackingSheet from "../components/TrackingSheet/TrackingSheet";
import { useLoaderData, Await, defer, redirect } from "react-router-dom";
import axios from "axios";
import getCredentials from "../Credentials";


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
  let credentials = getCredentials();
  try {
    const response = await axios.get("http://localhost:5000/api/transactions",
      {withCredentials: true},
      {
        headers: {
          'Authorization': `Bearer ${credentials.getToken()}`,
          'Cookie': `${credentials.getRefreshTokenForHeader()}`
        }});
    return response.data;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
}

export async function loader() {
  try {
  let transactions = await getTransactions();
  return defer({ transactions });
} catch (error) {
  return redirect("/auth?mode=login");
}
}