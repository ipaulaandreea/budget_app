import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import EditTransaction from '../../../components/EditTransaction'
import TrackingForm from "../../TrackingForm/TrackingForm";
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/modal';

const EditModal = (props) => {
  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.modal.displayModal);
  // const showEditModal = useSelector((state) => state.modal.displayModal);

  const handleClose = () => {
    dispatch(modalActions.hideModal());

  }


  return (
    <>


<Modal show={showEditModal} onClose = {handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body><EditTransaction/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
}

export default EditModal