import React, {useEffect, useState} from "react";
import {Modal,
    ButtonGroup, Button, Container, Row, Col, Form
} from 'react-bootstrap';


export default function EditingDialog(props) {
    const [task, setTask] = useState(props.task);

    useEffect(() => {
        setTask(props.task);
    }, [props.task]);

    const onTitleChange = (e) => {
        setTask({...task, title: e.target.value})
    }

    const onBodyChange = (e) => {
        setTask({...task, body: e.target.value})
    }

    return(
        <Modal show={props.open} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit the task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={onTitleChange} name="title" type="text" value={task.title}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Body</Form.Label>
                                <Form.Control onChange={onBodyChange} name="body" as="textarea" rows={5} value={task.body}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button onClick={() => props.onSave(task)}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}