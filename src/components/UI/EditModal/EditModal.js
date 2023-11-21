import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import EditTransaction from '../../../components/EditTransaction'
import AddTransaction from '../../../components/AddTransaction'
import AddCategories from '../../../components/AddCategories/AddCategories'
import EditCategories from '../../../components/AddCategories/EditCategories'

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

  return (
    <>


<Modal show={showEditModal} onClose = {handleClose} animation={false}>
        <Modal.Body>
          {isAdding && <AddTransaction/>}
          {isEditting && <EditTransaction/>} 
          </Modal.Body>
      </Modal>
  </>
  );
}

export default EditModal