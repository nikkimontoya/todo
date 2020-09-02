import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "./components/ControlButton";
import TaskList from "./components/TaskList";
import EditingDialog from "./components/EditingDialog";
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

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
    const [editingTask, setEditingTask] = useState(emptyTask);
    const [isEditingDialogOpen, setEditingDialogOpen] = useState(false);
    const [isPromptOpen, setPromptOpen] = useState(false);
    const [deletingTask, setDeletingTask] = useState(emptyTask);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const onEdit = (task) => {
        setEditingTask(task);
        setEditingDialogOpen(true);
    };

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

    const showPrompt = (taskUuid) => {
        setPromptOpen(true);
        setDeletingTask(tasks[taskUuid]);
    }

    const onTaskSave = (task) => {
        if (!task.uuid) {
            task.uuid = uuidv4();
        }

        setTasks({...tasks, [task.uuid]: task});
        setEditingDialogOpen(false);
    }

    const onMarkCompleted = (task) => {
        setTasks({...tasks, [task.uuid]: {...task, completed: true}});
    }

    return (
        <Container style={{marginTop: 40}}>
            <Row>
                <Col xs={12}>
                    <ControlButton size="lg" icon={faPlus} onClick={() => onEdit(emptyTask)}/>
                    Add a new task
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <TaskList tasks={tasks} onEdit={onEdit} onDelete={showPrompt} onMarkCompleted={onMarkCompleted}/>
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
                </Col>
            </Row>
        </Container>
    );
}

export default App;
