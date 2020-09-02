import React from "react";
import {Modal} from 'react-bootstrap';

export default function ViewDialog(props) {
    return(
        <Modal show={props.open} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.task.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.task.body}</Modal.Body>
        </Modal>
    );
}