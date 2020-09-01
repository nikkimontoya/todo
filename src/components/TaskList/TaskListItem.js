import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "../ControlButton";

export default function TaskListItem(props) {
    return (
        <ListGroupItem>
            <Container>
                <Row>
                    <Col>
                        {props.task.title}
                    </Col>
                    <Col xs="auto">
                        <ControlButton size="sm" icon={faEye}/>
                        <ControlButton size="sm" icon={faEdit} onClick={() => props.onEdit(props.task)}/>
                        <ControlButton size="sm" icon={faTrash}/>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    )
}