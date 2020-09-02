import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "./components/ControlButton";
import TaskList from "./components/TaskList";
import EditingDialog from "./components/EditingDialog";
import ViewDialog from "./components/ViewDialog";
import { v4 as uuidv4 } from 'uuid';

const PromptDialog = (props) => {
    return (
        <Modal show={props.open}>
            <Modal.Body>Are you sure you want to delete the task '{props.task.title}'?</Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose}>No</Button>
                <Button onClick={() => props.onOk(props.task.uuid)}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
}

function App() {
    const emptyTask = {title: '', body: '', completed: false};

    // All the tasks
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));

    // The task being edited at the moment
    const [editingTask, setEditingTask] = useState(emptyTask);

    // The task being viewed at the moment
    const [viewingTask, setViewingTask] = useState(emptyTask);

    // Is editing dialog opened?
    const [isEditingDialogOpen, setEditingDialogOpen] = useState(false);

    // Is prompt being shown?
    const [isPromptOpen, setPromptOpen] = useState(false);

    // Is view dialog opened?
    const [isViewOpen, setViewOpen] = useState(false);

    // The task being deleted at the moment
    const [deletingTask, setDeletingTask] = useState(emptyTask);

    // Saving tasks to local storage on every change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Callback executed on edit button click
    const onEdit = (task) => {
        setEditingTask(task);
        setEditingDialogOpen(true);
    };

    // Callback executed on confirming the prompt
    const onDelete = (taskUuid) => {
        setTasks(Object.values(tasks).reduce((acc, task) => {
            if (task.uuid === taskUuid) {
                return acc;
            }

            return {...acc, [task.uuid]: task}
        }, {}));

        setPromptOpen(false);
        setDeletingTask(emptyTask);
    }

    // Callback executed on delete button click
    const showPrompt = (taskUuid) => {
        setPromptOpen(true);
        setDeletingTask(tasks[taskUuid]);
    }

    // Callback executed on editing dialog save
    const onTaskSave = (task) => {
        if (!task.uuid) {
            task.uuid = uuidv4();
        }

        setTasks({...tasks, [task.uuid]: task});
        setEditingDialogOpen(false);
    }

    // Callback executed on mark as completed button click
    const onMarkCompleted = (task) => {
        setTasks({...tasks, [task.uuid]: {...task, completed: true}});
    }

    const onViewTask = (task) => {
        setViewingTask(task);
        setViewOpen(true);
    }

    return (
        <Container style={{marginTop: 40}}>
            <Row>
                <Col xs={12}>
                    <h1 align="center">Todo List</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ControlButton size="lg" icon={faPlus} onClick={() => onEdit(emptyTask)}/>
                    Add a new task
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <TaskList
                        tasks={tasks}
                        onEdit={onEdit}
                        onDelete={showPrompt}
                        onMarkCompleted={onMarkCompleted}
                        onView={onViewTask}
                    />
                    <EditingDialog
                        open={isEditingDialogOpen}
                        task={editingTask}
                        onClose={() => setEditingDialogOpen(false)}
                        onSave={onTaskSave}
                    />
                    <PromptDialog
                        open={isPromptOpen}
                        onClose={() => setPromptOpen(false)}
                        onOk={onDelete}
                        task={deletingTask}
                    />
                    <ViewDialog
                        open={isViewOpen}
                        onClose={() => setViewOpen(false)}
                        task={viewingTask}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
