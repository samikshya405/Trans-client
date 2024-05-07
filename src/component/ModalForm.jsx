import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircle } from "react-icons/io";
import NewTransForm from './NewTransForm';

function ModalForm({getUserTransaction}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <div className="text-end p-2 d-block d-md-none " onClick={handleShow}>
          <IoIosAddCircle size={"42px"} style={{color:"blue"}}  role='button'/>
        </div>
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
       TH App
      </Modal.Header>
        
        <NewTransForm getUserTransaction={getUserTransaction} handleClose={handleClose}/>
        
       
      </Modal>
    </>
  );
}

export default ModalForm;