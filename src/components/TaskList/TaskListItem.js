import React from "react";
import {ListGroupItem, Container, Row, Col, Popover, OverlayTrigger} from 'react-bootstrap';
import {faEye, faEdit, faTrash, faCheck, faCheckCircle, faBars} from "@fortawesome/free-solid-svg-icons";
import {faHourglass} from "@fortawesome/free-regular-svg-icons";
import ControlButton from "../ControlButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function TaskListItem(props) {
    const controls = (
        <React.Fragment>
            <ControlButton size="sm" title="View" icon={faEye} onClick={() => props.onView(props.task)}/>
            <ControlButton size="sm" title="Mark as completed" icon={faCheck}
                           onClick={() => props.onMarkCompleted(props.task)}/>
            <ControlButton size="sm" title="Edit" icon={faEdit} onClick={() => props.onEdit(props.task)}/>
            <ControlButton size="sm" title="Delete" icon={faTrash} onClick={() => props.onDelete(props.task.uuid)}/>
        </React.Fragment>
    );

    const popover = (
        <Popover style={{zIndex: 1040}}>
            <Popover.Content>{controls}</Popover.Content>
        </Popover>
    );

    return (
        <ListGroupItem>
            <Container>
                <Row>
                    <Col xs="auto">
                        <FontAwesomeIcon icon={props.task.completed ? faCheckCircle : faHourglass}/>
                    </Col>
                    <Col style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {props.task.title}
                    </Col>
                    <Col xs="auto">
                        <div className="d-none d-sm-block">
                        {controls}
                        </div>
                        <div className="d-block d-sm-none">
                            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                                <ControlButton icon={faBars}/>
                            </OverlayTrigger>
                        </div>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    )
}