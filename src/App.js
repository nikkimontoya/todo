import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "./components/ControlButton";
import TaskList from "./components/TaskList";
import EditingDialog from "./components/EditingDialog";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const emptyTask = {title: '', body: ''};

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
    const [editingTask, setEditingTask] = useState(emptyTask);
    const [isEditingDialogOpen, setEditingDialogOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const editCallback = (task) => {
        setEditingTask(task);
        setEditingDialogOpen(true);
    };

    const onTaskSave = (task) => {
        if (!task.uuid) {
            task.uuid = uuidv4();
        }

        setTasks({...tasks, [task.uuid]: task});
        setEditingDialogOpen(false)
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <ControlButton size="lg" icon={faPlus} onClick={() => editCallback(emptyTask)}/>
                    <TaskList tasks={tasks} onEdit={editCallback}/>
                    <EditingDialog
                        open={isEditingDialogOpen}
                        task={editingTask}
                        onClose={() => setEditingDialogOpen(false)}
                        onSave={onTaskSave}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
