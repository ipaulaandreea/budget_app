import TrackingForm from "./TrackingForm/TrackingForm";

const AddTransaction = () => {

  return (
    <>
    <h3>Add New Transaction: </h3>
    <TrackingForm method = 'POST' />
    </>
  )

}

export default AddTransaction;

