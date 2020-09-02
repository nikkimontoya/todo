import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function ControlButton(props) {
    return (
        <Button variant="link" title={props.title} size={props.size} style={{color: '#000'}} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon}/>
        </Button>
    );
}