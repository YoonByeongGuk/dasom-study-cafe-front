import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PiSealCheckFill } from "react-icons/pi";

function Malert(props, text) {
    const [show, setShow] = useState(false);

    const handleClose = () => props.setShow(false);
    const handleShow = () => props.BodysetShow(true);

    return(
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="modal-body">
                <PiSealCheckFill size={70}/>
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button 
                className="p-button" 
                variant="mb-3 p-1 px-3" 
                onClick={handleClose}>확인</Button>
            </Modal.Footer>
        </Modal>
    )
}

function Mconfirm() {
    
}

export {Malert, Mconfirm};