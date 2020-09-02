import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TaskListItem from "./TaskListItem";

export default function TaskList(props) {
    const sortTasks = (a, b) => {
        if (a.title > b.title) {
            return -1;
        }

        if (a.title < b.title) {
            return 1;
        }

        return 0;
    }

    const tasks = Object.values(props.tasks).sort(sortTasks).map((task, index) => (
        <TaskListItem
            key={index}
            task={task}
            onEdit={props.onEdit}
            onView={props.onView}
            onDelete={props.onDelete}
            onMarkCompleted={props.onMarkCompleted}
        />
    ));

    return (
        <ListGroup>{tasks}</ListGroup>
    );
}