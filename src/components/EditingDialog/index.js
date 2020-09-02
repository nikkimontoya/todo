import React, {useEffect, useState} from "react";
import {
    Modal,
    ButtonGroup, Button, Container, Row, Col, Form
} from 'react-bootstrap';


export default function EditingDialog(props) {
    const [task, setTask] = useState(props.task);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setTask(props.task);
    }, [props.task]);

    // reset 'validated' status on every new dialog opening
    useEffect(() => {
        setValidated(false);
    }, [props.open])

    const onTitleChange = (e) => {
        setTask({...task, title: e.target.value})
    }

    const onBodyChange = (e) => {
        setTask({...task, body: e.target.value})
    }

    return (
        <Modal show={props.open} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.task.title == '' ? 'Add a new' : 'Edit the'} task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Form validated={validated}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control onChange={onTitleChange} name="title" type="text" value={task.title}
                                                  required/>
                                    <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control onChange={onBodyChange} name="body" as="textarea" rows={5}
                                                  value={task.body} required/>
                                    <Form.Control.Feedback type="invalid">Body is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={() => {
                    setValidated(true);

                    if (task.title !== '' && task.body !== '') {
                        props.onSave(task)
                    }
                }}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}