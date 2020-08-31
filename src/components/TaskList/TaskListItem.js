import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const ControlButton = (props) => (
    <Button variant="link" size="sm" style={{color: '#000'}}>
        <FontAwesomeIcon icon={props.icon}/>
    </Button>
);

export default function TaskListItem(props) {
    return (
        <ListGroupItem>
            <Container>
                <Row>
                    <Col>
                        {props.task.title}
                    </Col>
                    <Col xs="auto">
                        <ControlButton icon={faEye}/>
                        <ControlButton icon={faEdit}/>
                        <ControlButton icon={faTrash}/>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    )
}