import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {faEye, faEdit, faTrash, faCheck, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faHourglass} from "@fortawesome/free-regular-svg-icons";
import ControlButton from "../ControlButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function TaskListItem(props) {
    return (
        <ListGroupItem>
            <Container>
                <Row>
                    <Col xs="auto">
                        <FontAwesomeIcon icon={props.task.completed ? faCheckCircle : faHourglass} />
                    </Col>
                    <Col>
                        {props.task.title}
                    </Col>
                    <Col xs="auto">
                        <ControlButton size="sm" icon={faCheck} onClick={() => props.onMarkCompleted(props.task)}/>
                        <ControlButton size="sm" icon={faEdit} onClick={() => props.onEdit(props.task)}/>
                        <ControlButton size="sm" icon={faTrash} onClick={() => props.onDelete(props.task.uuid)}/>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    )
}