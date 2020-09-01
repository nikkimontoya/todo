import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TaskListItem from "./TaskListItem";

export default function TaskList(props) {
    const tasks = Object.values(props.tasks).map((task, index) => <TaskListItem key={index} task={task} onEdit={props.onEdit}/>)

    return(
        <ListGroup>{tasks}</ListGroup>
    );
}