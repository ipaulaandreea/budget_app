import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import EditTransaction from '../../../components/EditTransaction'
import AddTransaction from '../../../components/AddTransaction'

import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/modal'

const EditModal = (props) => {
  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.modal.displayModal);
  const isAdding = useSelector((state) => state.modal.isAdding)
  const isEditting = useSelector((state) => state.modal.isEditting)
  // const showEditModal = useSelector((state) => state.modal.displayModal);

  const handleClose = () => {
    dispatch(modalActions.hideModal());

  }

  // isEditting, isAdding; 


  return (
    <>


<Modal show={showEditModal} onClose = {handleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>
            {isAdding && "Add transaction"} 
            {isEditting && "Edit transaction"}</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {isAdding && <AddTransaction/>}
          {isEditting && <EditTransaction/>} 
          </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
  </>
  );
}

export default EditModal