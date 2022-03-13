import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default function TestModal() {
    // console.log(handleShowModal);
    const [state, setstate] = useState(false)
    const handleShowModal = (status) => {
        setstate(status)
    }
    return (

        <div>
            {/* <p>cccccc</p> */}
            <Button
                bsStyle="primary"
                onClick={() => setstate(true)}
            >click</Button>
            <Modal
                show={state}
                onHide={() => handleShowModal(false)}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Contained Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
                    ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
