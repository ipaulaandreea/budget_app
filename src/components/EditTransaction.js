import TrackingForm from "./TrackingForm/TrackingForm";

import { useSelector } from "react-redux";

const EditTransaction = () => {
  // const data = useRouteLoaderData('tracker');
  const selectedTransaction = useSelector(
    (state) => state.transaction.selectedTransaction
  );
  console.log(selectedTransaction);
  return (
    <>
      <h3>Edit Transaction: </h3>

      <TrackingForm method="PUT" transaction={selectedTransaction} />
    </>
  );
};

export default EditTransaction;
